import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input() isDisable: Boolean = false

  constructor(
    private router: Router,
    private _location: Location,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  cancel() {
    this._location.back();
  }

  btnPagar() {
    this.router.navigate(['/payments']);
  }



}
