import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideReferralPipe } from './hide-referral.pipe';
import { HtmlPipe } from './html.pipe';
import { FiltertagPipe } from './filtertag.pipe';
import { FilterPaymentPipe } from './filter-payment.pipe';



@NgModule({
  declarations: [
    HideReferralPipe,
    HtmlPipe,
    FiltertagPipe,
    FilterPaymentPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HideReferralPipe,
    HtmlPipe,
    FiltertagPipe,
    FilterPaymentPipe
  ]
})
export class CustomPipeModule { }
