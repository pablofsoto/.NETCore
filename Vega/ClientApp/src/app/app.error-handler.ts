import { ErrorHandler, Inject, NgZone } from "@angular/core";
import { ToastrManager } from "ng6-toastr-notifications";


export class AppErrorHandler implements ErrorHandler{

    /**
     *
     */
    constructor(private ngZone: NgZone,
        @Inject(ToastrManager)  public toastr: ToastrManager) {
        
        
    }

    handleError(error: any): void {
        
        this.ngZone.run(() => {
            this.toastr.errorToastr(error, 'Oops!');
           }
        );
        
    }

}