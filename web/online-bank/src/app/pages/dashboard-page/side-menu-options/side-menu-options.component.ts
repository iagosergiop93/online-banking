import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getSideMenu } from 'src/app/utils/side-menu-utils';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-side-menu-options',
  templateUrl: './side-menu-options.component.html',
  styleUrls: ['./side-menu-options.component.scss']
})
export class SideMenuOptionsComponent implements OnInit {

	@Output('optionSelected') optionSelected = new EventEmitter<void>();
	options = getSideMenu();

	constructor(public router: Router, public userService: UsersService, public dialog: DialogService) {}

	ngOnInit(): void {
	}

	goTo(option) {

		this.optionSelected.emit();

		if(option.name === 'Sign out') {
			this.userService.logout();
		}
		else if(option.name === 'not-impl') {
			this.dialog.showFeedBackDialog('This feature hasn\'t been implemented yet');
		}
		if (!!option.path) {
			this.router.navigate([option.path]);
		}
	}

}
