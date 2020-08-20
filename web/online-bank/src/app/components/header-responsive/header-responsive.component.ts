import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getHeaderItems } from 'src/app/utils/header-utils';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-header-responsive',
  templateUrl: './header-responsive.component.html',
  styleUrls: ['./header-responsive.component.scss']
})
export class HeaderResponsiveComponent implements OnInit {

	@Input() page = '';
	@Input() disableBuiltToggle = false;
	@Output() toggleEvent = new EventEmitter<void>();
	title = 'Pereira Bank';
	toggle = false;
	items = [];

	constructor(public userService: UsersService,
		           public dialog: DialogService,
		           public router: Router) {}

	ngOnInit() {
		this.items = getHeaderItems(this.page);
	}

	toggleSidebar() {
		if(!this.disableBuiltToggle) this.toggle = !this.toggle;
		this.toggleEvent.emit();
	}

	headerLink(item: any) {
		if(item.name === 'Sign out') {
			this.userService.logout();
		}
		else if(item.path === 'not-impl') {
			this.dialog.showFeedBackDialog('This feature hasn\'t been implemented yet');
		}
		else if(!!item.path){
			this.router.navigate([item.path]);
		}
	}

}
