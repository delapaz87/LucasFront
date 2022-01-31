import { Component, OnInit } from '@angular/core';
import { CountryISO } from 'ngx-intl-tel-input';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../app.reducer';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.css']
})
export class ClientsAddComponent implements OnInit {

  CountryISO = CountryISO;
  formClient: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateWithCommerce>
  ) {
    this.formClient = this.fb.group({
      first_name: new  FormControl('',[Validators.required]),
      last_name: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      cia_id: new FormControl('',[Validators.required])
    });
  }

  ngOnInit(): void {
    this.store.select('commerce').subscribe( ({company})=> {
      this.formClient.controls['cia_id'].setValue(company.data.id)
    })
    this.js();
  }

  submitClient() {
    if(this.formClient.invalid) { return; }
    console.log(this.formClient.value);
  }

  js() {
    $(function(){
      $(document).click(function () {
       $(".dropdown-list").fadeOut();
       $(".g-input--material input").each(function () {
         if ($(this).val() === "") {
           $(this).removeClass("focus");
           $(this).siblings(".main-input").removeClass("focus");
           $(this).next(".placeholder").removeClass("focus");
         }
       });
     });

     $(".g-input--material").on({
       click: function(e) {
         $(this).find(".placeholder, input, .main-input").addClass("focus");
         e.stopPropagation();
       },
     });

     $(this).find(".placeholder, input, .main-input").addClass("focus");
    });
  }

}
