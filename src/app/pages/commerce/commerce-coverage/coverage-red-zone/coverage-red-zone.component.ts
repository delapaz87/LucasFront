import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import * as L from 'leaflet'
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

@Component({
  selector: 'app-coverage-red-zone',
  templateUrl: './coverage-red-zone.component.html',
  styleUrls: ['./coverage-red-zone.component.css']
})
export class CoverageRedZoneComponent implements OnInit, AfterViewInit {

  @ViewChild('mapaRed',{static:true}) mapas: ElementRef |  undefined;

  mapRed = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 19,
        attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  constructor() {
    //this.mapas.setView([-12.0463934,-77.0428566],12).addLayer(this.mapred);

  }

  ngAfterViewInit(): void {
    const map = new L.Map(this.mapas?.nativeElement).setView([-12.0463934,-77.0428566],12).addLayer(this.mapRed);
    map.pm.setLang('es');
    map.pm.addControls({
      position: 'topleft',
      drawMarker: false,
      drawCircleMarker: false,
      drawCircle: true,
      drawRectangle: false,
      drawPolygon: true,
      drawPolyline: false,
      cutPolygon: false,
    });
    map.addEventListener('click',function(e){
      setTimeout(function(){
          console.log('Llamado de atencion');
      });
    })
  }

  ngOnInit(): void {
  }


}
