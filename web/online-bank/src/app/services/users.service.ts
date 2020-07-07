import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Credentials } from '../entities/credentials';
import { API_URL } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../entities/user';
import { ValidatorService } from './validator.service';
import { tokenExists, getToken, saveToken, saveInfo, deleteToken } from '../utils/token-handler';
import { handleError } from '../exceptions/exceptions';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

	http: HttpClient;
	validator: ValidatorService;

	constructor(http: HttpClient,
		validator: ValidatorService) {
		this.http = http;
		this.validator = validator;
	}

	login(cred: Credentials): Observable<HttpResponse<User>> {
		deleteToken();
		if(!this.validator.credentials(cred)) throw new Error("Invalid Credentials");
		return this.http.post<User>(API_URL + "/users/login", cred, { observe: 'response' })
				.pipe(map(this.saveLoginInfo));
	}

	auth(): Observable<User> {
		if(!tokenExists()) throw new Error("Token doesn't exist");
		return this.http.post<User>(API_URL + "/users/auth", {}, {
			headers: new HttpHeaders({
				'Authorization': getToken()
			})
		}).pipe(catchError(handleError));
	}

	saveLoginInfo(res: HttpResponse<User>): HttpResponse<User> {
		// Save token
		let token = res.headers.get("Authorization");
		saveToken(token);

		// Save User info
		let info: User = res.body;
		saveInfo(info);

		return res;
	}
  
}