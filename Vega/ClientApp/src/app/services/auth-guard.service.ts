import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected auth: AuthService){

    }

    canActivate(){
        if (this.auth.isAuthenticated())
            return true;

        window.location.href = 'https://pabloproject.auth0.com/login?client=zwm7EwYbBXWK4zDfxk8DZRSBDgzLJjuN';
        return false;
        
    }
}