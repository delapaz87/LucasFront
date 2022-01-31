import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-split-payment',
  templateUrl: './split-payment.component.html',
  styleUrls: ['./split-payment.component.css']
})
export class SplitPaymentComponent implements OnInit {

  formulario: FormGroup;
  countPagos: number = 1;

  constructor(
    private route: Router,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      experienciaLaboral: this.fb.array([])
    });
    this.crearFormulario();
  }

  ngOnInit(): void {

  }

  get experienciaLaboral(): FormArray {
    return this.formulario.get('experienciaLaboral') as FormArray;
  }

  disminuir() {
    if(this.countPagos > 1) {
      this.borrarFormulario(this.countPagos)
      this.countPagos--
    }
  }

  aumentar() {
    if(this.countPagos < 5) {
      this.countPagos++
      this.crearFormulario();
    }
  }



  crearFormulario() {
    const trabajo = this.fb.group({
      prueba: new FormControl('')
    });
    this.experienciaLaboral.push(trabajo);
  }

  borrarFormulario(indice: number) {
    this.experienciaLaboral.removeAt(indice - 1);
  }

  paymentCompleted(){
    this.route.navigate(['payments/payment-completed'])

  }
}
