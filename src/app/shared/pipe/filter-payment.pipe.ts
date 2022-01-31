import { Pipe, PipeTransform } from '@angular/core';
import { PaymentAccept } from '../models/Company';

@Pipe({
  name: 'filterPayment'
})
export class FilterPaymentPipe implements PipeTransform {

  transform(items: PaymentAccept[], filter: any[]): PaymentAccept[] {
    if (!items || !filter) {
      return items;
    }

    const payment: PaymentAccept[] = [];
    filter.forEach( f => {
      payment.push(items.filter( i => i.value == f)[0])
    })

    return payment;
  }

}
