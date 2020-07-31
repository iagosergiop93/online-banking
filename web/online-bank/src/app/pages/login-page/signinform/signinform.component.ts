import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/entities/credentials';
import { createSignInFormGroup } from 'src/app/utils/createFormGroups';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup } from '@angular/forms';
import { userLoggedInCallback } from '../login-util';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-signinform',
  templateUrl: './signinform.component.html',
  styleUrls: ['./signinform.component.scss']
})
export class SigninformComponent implements OnInit {

	loginForm: FormGroup;

	get f() {
		return this.loginForm.controls;
	}

	constructor(public router: Router, public userService: UsersService,
		           public dialogService: DialogService) {}

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
				this.dialogService.showFeedBackDialog(err.description);
			}
		);
	}

}
