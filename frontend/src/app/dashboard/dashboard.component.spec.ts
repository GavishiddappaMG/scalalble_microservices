import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';


@Component({
  template: ''
})
class DummyComponent {
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, DummyComponent],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'devices', component: DummyComponent, data: {breadcrumb: 'Device'} },
          { path: 'orders', component: DummyComponent, data: {breadcrumb: 'Orders'} },
          { path: 'users', component: DummyComponent, data: {breadcrumb: 'Users'} },
          { path: 'resources', component: DummyComponent, data: {breadcrumb: 'Resource'} }
          { path: 'ticketing', component: DummyComponent, data: {breadcrumb: 'Ticketing'} }
        ])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /devices route on click of device card', fakeAsync(() => {
    // we trigger a click on our link
    fixture.debugElement
      .query(By.css('.devices'))
      .nativeElement.click();
    // We wait for all pending promises to be resolved.
    tick();
    expect(location.path()).toBe('/devices');
  }));

  it('should navigate to /orders route on click of orders card', fakeAsync(() => {
    fixture.debugElement
      .query(By.css('.orders'))
      .nativeElement.click();
    tick();
    expect(location.path()).toBe('/orders');
  }));

  it('should navigate to /users route on click of users card', fakeAsync(() => {
    fixture.debugElement
      .query(By.css('.users'))
      .nativeElement.click();
    tick();
    expect(location.path()).toBe('/users');
  }));

  it('should navigate to /resources route on click of resources card', fakeAsync(() => {
    fixture.debugElement
      .query(By.css('.resources'))
      .nativeElement.click();
    tick();
    expect(location.path()).toBe('/resources');
  }));

  it('should navigate to /ticketing route on click of ticketing card', fakeAsync(() => {
    fixture.debugElement
      .query(By.css('.ticketing'))
      .nativeElement.click();
    tick();
    expect(location.path()).toBe('/ticketing');
  }));

});
