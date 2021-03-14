import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilService } from '../services/util.service';
import { MatSidenav } from '@angular/material';
import { slideToBottom } from '../shared/animation/animation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [slideToBottom()]
})
export class DashboardComponent implements OnInit {

  items = [
    {
      title: 'Title 1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis ad perspiciatis doloremque quisquam ratione ipsa sequi.',
      imagePath: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
      price: 9.99
    },
    {
      title: 'Title 2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis ad perspiciatis doloremque quisquam ratione ipsa sequi.',
      imagePath: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
      price: 4.99
    },
    {
      title: 'Title 3',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis ad perspiciatis doloremque quisquam ratione ipsa sequi.',
      imagePath: 'https://homepages.cae.wisc.edu/~ece533/images/monarch.png',
      price: 6.99
    },
    {
      title: 'Title 4',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error blanditiis ad perspiciatis doloremque quisquam ratione ipsa sequi.',
      imagePath: 'https://homepages.cae.wisc.edu/~ece533/images/sails.png',
      price: 2.99
    }
  ];
  constructor(private utilService: UtilService) { }

  ngOnInit() { }



}
