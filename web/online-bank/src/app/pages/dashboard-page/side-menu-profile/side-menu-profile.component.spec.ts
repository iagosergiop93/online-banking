import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuProfileComponent } from './side-menu-profile.component';

describe('SideMenuProfileComponent', () => {
  let component: SideMenuProfileComponent;
  let fixture: ComponentFixture<SideMenuProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
