import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Location, CommonModule } from '@angular/common';

import { isFunction } from 'lodash';

/**
 * Wrapper of Angular router (only for testing purpose)
 * Meant to run all router operations within Angular zone
 *  * Keep change detection enabled
 *  * Avoids flooded console with warnings
 *    https://github.com/angular/angular/issues/25837
 *
 * @see Router
 */
export function wrapRouterInNgZone(router: Router, ngZone: NgZone): Router {
  return new Proxy(router, {
    get(target: Router, p: PropertyKey): unknown {
      const invokedProperty = target[p];
      if (!isFunction(invokedProperty)) {
        return invokedProperty;
      }

      return function(...args: Array<unknown>): unknown {
        return ngZone.run(() => invokedProperty.apply(target, args));
      };
    },
  });
}

@Component({ template: '' })
class ProxyComponent {}


describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let location: Location;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent, ProxyComponent],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'devices', component: ProxyComponent, data: { breadcrumb: 'Device'} }
        ])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);
    router = wrapRouterInNgZone(
      TestBed.get(Router),
      TestBed.get(NgZone),
    );
    activatedRoute = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have [ngClass] resolve to "hide"', async(() => {
    component.bcLength = 1;
    component.breadcrumbs$ = of([{ label: '', url: '' }]);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const value = fixture.debugElement.queryAll(By.css('.breadcrumb-item'))[0].classes;
      expect(value.hide).toBeTruthy();
    });
  }));

  it('should not have [ngClass] resolve to "hide"', async(() => {
    component.bcLength = 2;
    component.breadcrumbs$ = of([{ label: '', url: '' }]);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const value = fixture.debugElement.queryAll(By.css('.breadcrumb-item'))[0].classes;
      expect(value.hide).toBeFalsy();
    });
  }));

  it('should have length of breadcrumb to 0 or more', async( () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const breadcrumbs = component.buildBreadCrumb(activatedRoute.root);
      expect(breadcrumbs.length).toBeGreaterThanOrEqual(0);
    });
  }));

  it('should have breadcrumb elements equal to or greater than 1 ', async( () => {
    fixture.whenStable().then(() => {
      router.navigate(['/devices']);
      fixture.detectChanges();
      const breadcrumbs = component.buildBreadCrumb(activatedRoute.root);
      expect(breadcrumbs.length).toBeGreaterThan(0);
    });
  }));
});
