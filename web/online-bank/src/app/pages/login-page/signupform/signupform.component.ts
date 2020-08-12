import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterUserForm } from 'src/app/entities/principal';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { userLoggedInCallback } from '../login-util';
import { createSignUpFormGroup } from 'src/app/utils/createFormGroups';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss']
})
export class SignupformComponent implements OnInit {

	@ViewChild('submitbtn') submitbtn: HTMLButtonElement;
	loginForm: FormGroup;

	get f() {
		return this.loginForm.controls;
	}

	constructor(public router: Router, public userService: UsersService,
		           public dialogService: DialogService) {}

	ngOnInit(): void {
		this.loginForm = createSignUpFormGroup();
	}

	submitForm() {
		this.submitbtn.disabled = true;
		const result = Object.assign({}, this.loginForm.value);
		const registerUserForm = new RegisterUserForm(result.firstName, result.lastName, result.email, result.passwd);

		// Make the request
		this.userService.register(registerUserForm).subscribe(
			(res) => {
				userLoggedInCallback(this.router);
				this.submitbtn.disabled = false;
			},
			(err) => {
				const errorMsg = !!err.description ? err.description : 'Some error happened. Try again later';
				this.dialogService.showFeedBackDialog(err.description);
				this.submitbtn.disabled = false;
			}
		);

	}

}
