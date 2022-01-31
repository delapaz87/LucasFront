import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as adminActions from './store/actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(adminActions.cargarTypeDocument());
    this.store.dispatch(adminActions.cargarPaymentAccept());
    this.store.dispatch(adminActions.cargarTag());
    this.store.dispatch(adminActions.cargarGeoCities());
    this.store.dispatch(adminActions.cargarCommerce());
    this.store.dispatch(adminActions.cargarCompanyInscription());
  }

}
