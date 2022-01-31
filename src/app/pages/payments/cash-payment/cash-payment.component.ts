import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStateWithCommerce } from '../../../app.reducer';
import * as actions from './cash.action';

@Component({
  selector: 'app-cash-payment',
  templateUrl: './cash-payment.component.html',
  styleUrls: ['./cash-payment.component.css']
})
export class CashPaymentComponent implements OnInit, OnDestroy {


  amount: number = 29.50;
  totalEfectivo: number = 0;
  cash: number = 0;
  decimals: boolean = false;

  cashSubcription: Subscription | any;

  constructor(
    private store: Store<AppStateWithCommerce>
  ) { }

  ngOnInit(): void {
   this.cashSubcription = this.store.select('cash').subscribe(cash => {
      this.cash = cash;
      if(cash > 0) {
        this.totalEfectivo = this.cash - this.amount
      }
    });

  }

  ngOnDestroy() {
    this.cashSubcription.unsubscribe();
  }

  operador(monto: number) {
    this.store.dispatch(actions.operador({valor: monto, punto: this.decimals}));
    this.decimals = false;
  }

  punto() {
    if (this.cash % 1 == 0) {
      this.decimals = true;
    }
  }

  exact(monto: number) {
    this.store.dispatch(actions.exact({valor: monto}));
  }

  reset(){
    this.store.dispatch(actions.reset());
    this.totalEfectivo = 0;
    this.decimals = false;
  }

}
