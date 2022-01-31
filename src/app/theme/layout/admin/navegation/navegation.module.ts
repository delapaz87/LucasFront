import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavegationRoutingModule } from './navegation-routing.module';
import { NavegationComponent } from './navegation.component';
import { NavContectComponent } from './nav-contect/nav-contect.component';
import { NavGroupComponent } from './nav-contect/nav-group/nav-group.component';
import { NavItemComponent } from './nav-contect/nav-item/nav-item.component';
import { NavigationItem } from './navegation';


@NgModule({
  declarations: [
    NavegationComponent,
    NavContectComponent,
    NavGroupComponent,
    NavItemComponent
  ],
  imports: [
    CommonModule,
    NavegationRoutingModule
  ],
  exports:[
    NavegationComponent,
    NavContectComponent,
    NavGroupComponent,
    NavItemComponent
  ],
  providers: [
    NavigationItem
  ]
})
export class NavegationModule { }
