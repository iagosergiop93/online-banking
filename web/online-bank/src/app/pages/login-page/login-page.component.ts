import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { whichPageLogin, getLoginLinks } from './login-util';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, AfterViewInit {

	router: Router;
	
	page: string = "";
	links = [];

	constructor(router: Router) {
		this.router = router;
	}

	ngOnInit(): void {
		this.page = whichPageLogin(this.router);
		this.links = getLoginLinks(this.page);
	}

	ngAfterViewInit(): void {
		
	}

	goTo(path: string) {
		this.router.navigate([path]);
	}


}
