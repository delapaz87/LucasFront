import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as $ from "jquery";
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../app.reducer';


@Component({
  selector: 'app-commerce',
  templateUrl: './commerce.component.html',
  styleUrls: ['./commerce.component.css']
})
export class CommerceComponent implements OnInit {


  constructor(
    public store: Store<AppStateWithCommerce>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

  }


}
