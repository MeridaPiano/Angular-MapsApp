import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentPosition: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento HTML no fue encontrado.';

    this.map = new Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentPosition, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(){
    if(!this.map) throw "Mapa no inicializado."

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if( this.map!.getZoom() < 18 ) return;

      this.map?.zoomTo(18)
    });

    this.map.on('move', () => {
      this.currentPosition = this.map!.getCenter();
    });

  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged(value: string){
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom )
  }
}
