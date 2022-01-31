import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients-historys',
  templateUrl: './clients-historys.component.html',
  styleUrls: ['./clients-historys.component.css']
})
export class ClientsHistorysComponent implements OnInit {


  @Input() items: any;

  constructor(

  ) { }

  ngOnInit(): void {
  }

}
