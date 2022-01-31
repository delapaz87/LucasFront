import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Models  from '../../../shared/models/Company';
import { AppStateWithCommerce } from '../../../app.reducer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import *  as actions from '../../../theme/layout/admin/store/actions';

@Component({
  selector: 'app-commerce-stores',
  templateUrl: './commerce-stores.component.html',
  styleUrls: ['./commerce-stores.component.css'],
})
export class CommerceStoresComponent implements OnInit, AfterViewInit, OnDestroy  {

  displayedColumns: string[] = ['id', 'title', 'phone', 'address', 'cover', 'status'];
  dataSource: any;
  storeSub: Subscription | undefined;

  stores: Models.Store[] | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(
    private route: Router,
    private store: Store<AppStateWithCommerce>
  ) { }


  ngOnDestroy(): void {
    this.storeSub?.unsubscribe();
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.store.dispatch(actions.cargarStores());
    this.storeSub = this.store.select('commerce').subscribe( ({ stores }) => {
      this.dataSource = new MatTableDataSource(stores.data);
      this.stores = stores.data
    });
  }

  edit(id:string) {
    this.route.navigateByUrl('commerce/stores/edit/'+ id)
  }

  remove(id:string) {

  }

}
