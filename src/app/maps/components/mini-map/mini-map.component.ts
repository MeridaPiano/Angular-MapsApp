import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{

  @ViewChild('map') divMap?: ElementRef;
  @Input() lngLat?: [number, number];

  public map?: Map;


  ngAfterViewInit(): void {
    if( !this.divMap ) throw 'El elemento HTML no fue encontrado.';
    if( !this.lngLat ) throw 'Propiedad requerida.'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
      interactive: false,
    });

    new Marker()
      .setLngLat( this.lngLat)
      .addTo(this.map);

  }
}
