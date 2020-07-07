import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getToken } from '../utils/token-handler';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        let token = getToken();
        if(!token || !!req.url.match(/^[a-zA-Z\:\d\/]*login\/*/)) return next.handle(req);
        
        let authReq = req.clone({
            setHeaders: {
                Authorization: token
            }
        })

        return next.handle(authReq);
    }
}