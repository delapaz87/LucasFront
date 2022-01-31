import { Component, Input, OnInit } from '@angular/core';
import { CommerceSidebarItem } from '../commerce-sidebar';

@Component({
  selector: 'app-commerce-sidebar-item',
  templateUrl: './commerce-sidebar-item.component.html',
  styleUrls: ['./commerce-sidebar-item.component.css']
})
export class CommerceSidebarItemComponent implements OnInit {

  @Input() item: CommerceSidebarItem | any;

  constructor() { }

  ngOnInit(): void {
  }

}
