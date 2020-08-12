import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { state, style, transition, animate, trigger } from '@angular/animations';
import { RouterOutlet, Router } from '@angular/router';
import { fader, slider } from '../../animations/animations';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  animations: [slider]
})
export class DashboardPageComponent implements OnInit {

	isMobile = false;

	constructor(public router: Router) {}

	ngOnInit(): void {
		this.isMobile = document.body.offsetWidth <= 800;
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
	}

	goTo(path: string) {
		this.router.navigate([path]);
	}

}
