import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    tokenService: TokenService;

    constructor(tokenService: TokenService) {
        this.tokenService = tokenService;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        let token = this.tokenService.getToken();
        if(!token) return next.handle(req);
        
        let authReq = req.clone({
            setHeaders: {
                Authorization: token
            }
        })

        return next.handle(authReq);
    }
}