import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string,
  marker: Marker
}

interface PlainMarker {
  color: string,
  lnglat: number[]
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public currentPosition: LngLat = new LngLat(-74.5, 40);
  public markerList: MarkerAndColor[] = [];

  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento HTML no fue encontrado.';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentPosition, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML = 'Erick Merida'
    // const marker = new Marker()
    // .setLngLat( this.currentPosition )
    // .addTo( this.map );
  }

  createMarker(){

    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lgnlat = this.map.getCenter();

    this.addMarker(lgnlat, color)

  }

  addMarker(lngLat: LngLat, color: string){
    if( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
    .setLngLat( lngLat )
    .addTo( this.map )

    this.markerList.push( {color, marker} );
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage()
    });
  }

  deleteMarker(index: number){
    this.markerList[index].marker.remove();
    this.markerList.splice(index,1);
  }

  flyTo( marker: Marker ) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    })
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markerList.map( (z) => {
      return {
        color: z.color,
        lnglat: z.marker.getLngLat().toArray(),
      }
    });
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lnglat }) => {
      const [lng, lat ] = lnglat;
      const coords = new LngLat(lng, lat)
      this.addMarker(coords, color);
    });
  }
}
