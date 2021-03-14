import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { BreadCrumb } from './breadcrumb.model';
import { slideToRight } from '../animation/animation.component';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  animations: [slideToRight()]
})
export class BreadcrumbComponent implements OnInit {

  bcLength: number;
  rootPath: boolean;
  breadcrumbs$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map(event => this.buildBreadCrumb(this.activatedRoute.root))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() { }


  buildBreadCrumb(route: ActivatedRoute, url: string = '',
    breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    //If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig ? route.routeConfig.data['breadcrumb'] : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';
    //In the routeConfig the complete path is not available, 
    //so we rebuild it each time
    const nextUrl = `${url}/${path}`;
    const breadcrumb = {
      label: label,
      url: nextUrl.replace(/^\/|\/$/g, '')
    };
    let newBreadcrumbs = breadcrumbs;
    const obj = breadcrumbs.find(item => item.label === breadcrumb.label && item.url === breadcrumb.url);
    if (!obj) {
      newBreadcrumbs = [...newBreadcrumbs, breadcrumb];
    }
    if (route.firstChild) {
      //If we are not on our current path yet, 
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    this.bcLength = newBreadcrumbs.length;
    return newBreadcrumbs;
  }

}
