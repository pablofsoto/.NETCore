import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { JwtHelperService } from '@auth0/angular-jwt';

(window as any).global = window;

@Injectable()
export class AuthService {
    
  profile: any;

  private roles: string[] = [];

  auth0 = new auth0.WebAuth({
    clientID: 'zwm7EwYbBXWK4zDfxk8DZRSBDgzLJjuN',
    domain: 'pabloproject.auth0.com',
    audience: 'https://api.vega.com',
    responseType: 'token id_token',                    //,
    redirectUri: 'http://localhost:5000',
    scope: 'openid profile email'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';

        
        this.setRoles(authResult.idToken);

        this.setSession(authResult);
        this.router.navigate(['/vehicles']);
      } else if (err) {
        this.router.navigate(['/vehicles']);
        console.log(err);
      }
    });

}

    public isInRole (roleName){
      return this.roles.indexOf(roleName) > -1;
    }
   
    private setRoles(idToken) {
      var jwtHelper = new JwtHelperService();
      var decodedToken = jwtHelper.decodeToken(idToken);
      this.roles = decodedToken['https://vega.com/roles'];
    }
     
    private setSession(authResult): void {
        // Set the time that the Access Token will expire at
        console.log(authResult);
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
      }
    
      public logout(): void {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('profile');

        this.profile = null;
        this.roles = [];
        // Go back to the home route
        this.router.navigate(['/']);
      }
    
      public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // Access Token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
        return new Date().getTime() < expiresAt;
      } 

      public getProfile(cb): void {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          throw new Error('Access Token must exist to fetch profile');
        }
      
        
        

        const self = this;
        this.auth0.client.userInfo(accessToken, (err, profile) => {
          

          if (profile) {
            self.profile = profile;
            localStorage.setItem('profile', JSON.stringify(profile));
          }
          cb(err, profile);
        });
      }


}