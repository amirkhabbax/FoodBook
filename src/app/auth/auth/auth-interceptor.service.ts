import { User } from './../models/user.model';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let user = this.authService.userSubject.value;
        if(!user){
            return next.handle(req);
        }

        const modifiedReq = req.clone({ params: new HttpParams().set('auth', user?.token ? user?.token : '') })
        return next.handle(modifiedReq);
    }

}