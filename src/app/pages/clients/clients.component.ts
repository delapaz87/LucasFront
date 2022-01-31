import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStateWithCommerce } from '../../app.reducer';
import * as actions from '../../theme/layout/admin/store/actions/clients.actions';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  isLoading: Boolean = true;
  clientsSub: Subscription | any;
  companySub: Subscription | any;
  clients: any[] = [];
  company: any;

  client: any;

  constructor(
    private router: Router,
    private store: Store<AppStateWithCommerce>
  ) {

  }

  ngOnInit(): void {
    this.companySub = this.store.select('commerce').subscribe( ({company}) => {
      this.company = company.data;
    });
    if(this.company?.id != null || this.company?.id != '') {
      this.store.dispatch(actions.cargarClients({ id: this.company.id}))
    }

    this.clientsSub = this.store.select('commerce').subscribe( ({clients}) => {
      this.clients = clients.data;
      this.isLoading = clients.loading;
      this.selectUser(clients.data[0]);
      }
    )
  }

  searchFilter() {
    console.log('prueba de busqueda')
  }

  selectUser(item: any) {
    this.router.navigate(['/clients'])
    this.client = item;
  }

  addClients() {
    this.router.navigate(['/clients/add'])
  }

  getRouter() {
    return this.router.url == '/clients/add' ? true : false;
  }

  ngOnDestroy(): void {
    this.companySub.unsubscribe();
    this.clientsSub.unsubscribe();
  }

}
