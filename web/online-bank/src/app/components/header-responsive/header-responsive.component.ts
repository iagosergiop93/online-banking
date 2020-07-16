import { Component, OnInit, Input } from '@angular/core';
import { getHeaderItems } from 'src/app/utils/header-utils';

@Component({
  selector: 'app-header-responsive',
  templateUrl: './header-responsive.component.html',
  styleUrls: ['./header-responsive.component.scss']
})
export class HeaderResponsiveComponent implements OnInit {

	@Input() page = "landing-page";

	title = 'Pereira Bank';
	toggle = false;

	items = [];

	toggleSidebar() {
		this.toggle = !this.toggle;
	}

	constructor() { }

	ngOnInit() {
		this.items = getHeaderItems(this.page);
	}

}
