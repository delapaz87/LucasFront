import { Component, OnInit } from '@angular/core';
import { CommerceSidebarItem } from './commerce-sidebar';

@Component({
  selector: 'app-commerce-sidebar',
  templateUrl: './commerce-sidebar.component.html',
  styleUrls: ['./commerce-sidebar.component.css']
})
export class CommerceSidebarComponent implements OnInit {

  public navigation: any;

  constructor(
    private sidebar: CommerceSidebarItem
  ) {
    this.navigation = this.sidebar.get();
  }

  ngOnInit(): void {
  }

}
