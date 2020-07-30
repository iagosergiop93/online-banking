import { Component, OnInit, Input } from '@angular/core';
import { getHeaderItems } from 'src/app/utils/header-utils';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-responsive',
  templateUrl: './header-responsive.component.html',
  styleUrls: ['./header-responsive.component.scss']
})
export class HeaderResponsiveComponent implements OnInit {

	@Input() page = 'landing-page';
	title = 'Pereira Bank';
	toggle = false;
	items = [];

	userService: UsersService;
	router: Router;

	constructor(userService: UsersService, router: Router) {
		this.userService = userService;
		this.router = router;
	}

	ngOnInit() {
		this.items = getHeaderItems(this.page);
	}

	toggleSidebar() {
		this.toggle = !this.toggle;
	}

	headerLink(item: any) {
		if(item.name === 'Sign out') {
			this.userService.logout();
		}
		else if(!!item.path){
			this.router.navigate([item.path]);
		}
	}

}
