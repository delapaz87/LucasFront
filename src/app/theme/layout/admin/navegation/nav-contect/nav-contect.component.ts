import { Location } from '@angular/common';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, NgZone, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from '../navegation';
import { NextConfig } from '../../../../../shared/config';
import { StorageService } from '../../../../../shared/services/storage.service';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../../app.reducer';
import * as authActions from '../../../../../pages/authentication/store/actions';
import { Subscription } from 'rxjs';
import { Company } from '../../../../../shared/models/Company';
import * as actions from '../../store/actions';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-nav-contect',
  templateUrl: './nav-contect.component.html',
  styleUrls: ['./nav-contect.component.css']
})
export class NavContectComponent implements OnInit {

  public nextConfig: any;
  public navigation: any;
  companySub: Subscription | undefined;
  company: any | Company;
  titlePage: string = '';

  @ViewChild('SideNavBar', {static: false}) SideNavBar: ElementRef |  undefined;

  constructor(
    private router: Router,
    private store: Store<AppStateWithCommerce>,
    private renderer: Renderer2,
    public nav: NavigationItem,
    private storeService: StorageService,
    private titleSrv: Title,
  ) {
    this.nextConfig = NextConfig.config;
    this.navigation = this.nav.get();
    this.store.dispatch(actions.cargarCommerce());
  }

  ngOnInit(): void {
    this.companySub = this.store.select('commerce').subscribe( ({company}) => this.company = company.data)
    this.navigation.forEach((e: NavigationItem) => {
      e.children?.forEach((s: NavigationItem) => {
        if(this.router.url.includes(String(s.url))) {
          this.titleSrv.setTitle(s.title);
          this.titlePage = s.title;
        }
      })
    });
  }

  openNav() {
    this.renderer.setStyle(this.SideNavBar?.nativeElement,'width','350px');
  }

  closeNav() {
    this.renderer.setStyle(this.SideNavBar?.nativeElement,'width','0px');
  }

  logout() {
    this.storeService.logout();
  }

}
