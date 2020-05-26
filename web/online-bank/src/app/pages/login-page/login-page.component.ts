import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  pwFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  constructor() { }

  ngOnInit() {
  }

  submitLogin() {

    // Validation

    // Send to server

  }

}
