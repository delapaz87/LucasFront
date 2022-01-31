import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigationItem } from '../../navegation';

@Component({
  selector: 'app-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.css']
})
export class NavGroupComponent implements OnInit {

  @Input() item: NavigationItem | any;

  constructor() { }

  ngOnInit(): void {
  }


}
