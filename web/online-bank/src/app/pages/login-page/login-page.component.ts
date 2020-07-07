import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Credentials } from 'src/app/entities/credentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

	loginForm: FormGroup;
	userService: UsersService;
	router: Router;

	get f() {
		return this.loginForm.controls;
	}

	constructor(userService: UsersService, router: Router) {
		this.userService = userService;
		this.router = router;
	}

	ngOnInit() {
		this.loginForm = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.email,
			]),
			passwd: new FormControl('', [
				Validators.required,
				Validators.minLength(4)
			])
		});
	}

	submitForm() {
		const result = Object.assign({}, this.loginForm.value);
		let cred = new Credentials(result.email, result.passwd);
		
		// Make the request
		this.userService.login(cred).subscribe(
			(res) => {
				this.userLoggedInCallback();
			},
			(err) => {
				console.log(err);
			}
		);

		this.loginForm.reset();
	}

	userLoggedInCallback() {
		this.router.navigate(['/home']);
	}

}
