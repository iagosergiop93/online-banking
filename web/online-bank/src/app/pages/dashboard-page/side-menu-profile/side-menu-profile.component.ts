import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/entities/user';
import { getInfo } from 'src/app/utils/token-handler';

@Component({
  selector: 'app-side-menu-profile',
  templateUrl: './side-menu-profile.component.html',
  styleUrls: ['./side-menu-profile.component.scss']
})
export class SideMenuProfileComponent implements OnInit {

	user: User = getInfo();

	constructor() { }

	ngOnInit(): void {
	}

}
