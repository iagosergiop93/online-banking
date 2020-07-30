import { Component, OnInit } from '@angular/core';
import { getSideMenu } from 'src/app/utils/side-menu-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu-options',
  templateUrl: './side-menu-options.component.html',
  styleUrls: ['./side-menu-options.component.scss']
})
export class SideMenuOptionsComponent implements OnInit {

	options = getSideMenu();
	router: Router;

	constructor(router: Router) {
		this.router = router;
	}

	ngOnInit(): void {
	}

	goTo(option) {
		if (!!option.path) {
			this.router.navigate([option.path]);
		}
	}

}
