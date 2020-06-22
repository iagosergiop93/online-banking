import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../entities/credentials';
import { API_URL } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../entities/user';
import { ValidatorService } from './validator.service';
import { TokenService } from './token.service';
import { handleError } from '../exceptions/exceptions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

	http: HttpClient;
	validator: ValidatorService;
	tokenService: TokenService;

	constructor(http: HttpClient,
		tokenService: TokenService,
		validator: ValidatorService) {
		this.http = http;
		this.validator = validator;
		this.tokenService = tokenService;
	}

	login(cred: Credentials): Observable<User> {
		if(!this.validator.credentials(cred)) throw new Error("Invalid Credentials");
		return this.http.post<User>(API_URL + "/login", cred)
			.pipe(catchError(handleError));
	}

	auth(): Observable<User> {
		if(!this.tokenService.tokenExists()) throw new Error("Token doesn't exist");
		return this.http.post<User>(API_URL + "/auth", {}, {
			headers: new HttpHeaders({
				'Authorization': this.tokenService.getToken()
			})
		}).pipe(catchError(handleError));
	}

  
}
