import { Component, OnInit } from '@angular/core';
import { RegisterUserForm } from 'src/app/entities/principal';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { userLoggedInCallback } from '../login-util';
import { createSignUpFormGroup } from 'src/app/utils/createFormGroups';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss']
})
export class SignupformComponent implements OnInit {

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
		this.loginForm = createSignUpFormGroup();
	}

	submitForm() {
		const result = Object.assign({}, this.loginForm.value);
		let registerUserForm = new RegisterUserForm(result.firstName, result.lastName, result.email, result.passwd);
		
		// Make the request
		this.userService.register(registerUserForm).subscribe(
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
