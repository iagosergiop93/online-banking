import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/entities/credentials';
import { createSignInFormGroup } from 'src/app/utils/createFormGroups';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { userLoggedInCallback } from '../login-util';

@Component({
  selector: 'app-signinform',
  templateUrl: './signinform.component.html',
  styleUrls: ['./signinform.component.scss']
})
export class SigninformComponent implements OnInit {

	loginForm: FormGroup;
	userService: UsersService;
	router: Router;

	get f() {
		return this.loginForm.controls;
	}

	constructor(router: Router, userService: UsersService) {
		this.router = router;
		this.userService = userService;
	}

	ngOnInit(): void {
		this.loginForm = createSignInFormGroup();
	}


	submitForm() {
		const result = Object.assign({}, this.loginForm.value);
		const cred = new Credentials(result.email, result.passwd);

		// Make the request
		this.userService.login(cred).subscribe(
			(res) => {
				userLoggedInCallback(this.router);
			},
			(err) => {
				console.log(err);
			}
		);

		this.loginForm.reset();
	}

}
