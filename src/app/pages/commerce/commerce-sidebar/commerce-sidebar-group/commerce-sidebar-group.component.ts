import { Component, Input, OnInit } from '@angular/core';
import { CommerceSidebarItem } from '../commerce-sidebar';

@Component({
  selector: 'app-commerce-sidebar-group',
  templateUrl: './commerce-sidebar-group.component.html',
  styleUrls: ['./commerce-sidebar-group.component.css']
})
export class CommerceSidebarGroupComponent implements OnInit {

  @Input() item: CommerceSidebarItem | any;

  constructor() { }

  ngOnInit(): void {
  }

}
