import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-responsive',
  templateUrl: './header-responsive.component.html',
  styleUrls: ['./header-responsive.component.scss']
})
export class HeaderResponsiveComponent implements OnInit {

  title = 'Pereira Bank';
  toggle = false;

  items = [
    { name: 'Checking', link: '' },
    { name: 'Savings', link: '' },
    { name: 'Investments', link: '' },
    { name: 'Sign up', link: '' }
  ];

  toggleSidebar() {
    this.toggle = !this.toggle;
  }

  constructor() { }

  ngOnInit() {
  }

}
