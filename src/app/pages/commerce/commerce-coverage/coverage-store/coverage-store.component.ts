import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { Store } from '@ngrx/store';
import { AppStateWithCommerce } from '../../../../app.reducer';
import * as modals from '../../../../shared/models/Company';
import { Subscription } from 'rxjs';
import * as actions from '../../../../theme/layout/admin/store/actions';

@Component({
  selector: 'app-coverage-store',
  templateUrl: './coverage-store.component.html',
  styleUrls: ['./coverage-store.component.css']
})
export class CoverageStoreComponent implements OnInit, OnDestroy {

  @ViewChild('mapaCobertura',{static:true}) mapas: ElementRef |  undefined;

  stores: modals.Store[] = [];
  stores_coverage: modals.Coverage[] = [];
  mapCover: L.Map | any;
  coverageSub: Subscription | undefined;

  mapCobertura = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  constructor(
    private store: Store<AppStateWithCommerce>,
  ) {
    this.store.dispatch(actions.cargarStores())
  }

  ngOnDestroy(): void {
    this.coverageSub?.unsubscribe();
    this.mapCover.remove();
  }

  ngOnInit(): void {
    this.mapCover = new L.Map(this.mapas?.nativeElement).setView([-12.0463934,-77.0428566],12).addLayer(this.mapCobertura);
    //const mapCover = new L.Map(this.mapas?.nativeElement).setView([-12.0463934,-77.0428566],12).addLayer(this.mapCobertura);
    this.mapCover.pm.setLang('es');
    this.mapCover.pm.addControls({
      position: 'topleft',
      drawMarker: false,
      drawCircleMarker: false,
      drawCircle: false,
      drawRectangle: false,
      drawPolygon: true,
      drawPolyline: false,
      cutPolygon: true,
    });

    this.coverageSub = this.store.select('commerce').subscribe( ({stores}) => {
      this.stores = stores.data;
      this.stores.forEach(e => {

        // Mapa Marker
        let latitude = L.latLng(Number(e.latitude),Number(e.longitude),12)
        let marker = new L.Marker(latitude);
        marker.bindPopup("<b>"+e.title+"</b><br>"+e.street_name+" "+e.street_number)
        marker.feature = {
          type: 'Feature',
          properties: {
            id: e.id,
            title: e.title,
            type: 'tienda'
          },
          geometry: {
            type: 'Point',
            coordinates: [Number(e.latitude), Number(e.longitude)]
          }
        }
        marker.addEventListener('click', function (e) {
          setTimeout(function(){
            let ids = [];
            console.log(e)
          },200)
        });
        new L.LayerGroup([marker]).addTo(this.mapCover);

        // Mapa Polyline
        let unico: any[] = [];
        e.coverage.forEach( c => {
          if(!unico.includes(c.territory)) {
            unico.push(c.territory)
          }
        });

        unico.forEach( t => {
          let latlngs: any[] = [];
          e.coverage.filter(e => e.territory == t).forEach( c => {
            latlngs.push([ c.latitude, c.longitude]);
          });

          let color = this.getRandomColor();
          let polyline = L.polyline(latlngs,{color:color,fill:true,fillColor:color});
          polyline.bindPopup("<b>"+t+"</b>");
          polyline.feature = {
            type: 'Feature',
            properties: {
              store_id: e.coverage[0].store_id,
              territory: t,
              zone: 1,
              type: "verde"
            },
            geometry: {
              type: 'LineString',
              coordinates: latlngs
            }
          }
/*           polyline.addEventListener('click',function(e) {
            setTimeout(function(){
              console.log('Click')
            },200);
          }); */
          polyline.addEventListener('dblclick',function(e) {
            setTimeout(function(){
                console.log('Double Click')
            },200);
          });
          new L.LayerGroup([polyline]).addTo(this.mapCover);
        });

      });
    });
  }

  getRandomColor() {
    var lum = -0.25;
    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
  }

}
