import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigationItem } from '../../navegation';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {

  @Input() item: NavigationItem | any;

  constructor() { }

  ngOnInit(): void {
  }


}
