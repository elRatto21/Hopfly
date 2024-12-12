import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-comp',
  templateUrl: './map-comp.component.html',
  styleUrls: ['./map-comp.component.scss'],
  standalone: true
})
export class MapComponent implements AfterViewInit {

  private map!: L.Map;
  private markers: L.Marker[] = [];

  private defaultCenter: L.LatLngTuple = [47.508820319182774, 7.616206062342946];
  private userMarker!: L.Marker;
  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeMap();
    }, 50)
  }

  private async initializeMap() {
    this.map = L.map('map', {
      center: this.defaultCenter,
      zoom: 15,
      zoomControl: false,
    });

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 20,
      subdomains: ['a', 'b', 'c']
    }).addTo(this.map);
  }

  private addDrinkMarkers(): void {
    const customIcon = L.icon({
      iconUrl: 'assets/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    /*this.drinkEntries.forEach(entry => {
      const marker = L.marker([entry.latitude, entry.longitude], { icon: customIcon })
        .bindPopup(`<b>${entry.name}</b>`)
        .addTo(this.map);

      this.markers.push(marker);
    });*/
  }

  public addMarker(entry: any): void {
    const marker = L.marker([entry.latitude, entry.longitude])
      .bindPopup(`<b>${entry.name}</b>`)
      .addTo(this.map);

    this.markers.push(marker);
    //this.drinkEntries.push(entry);
  }

  public centerMap(latitude: number, longitude: number, zoom: number = 13): void {
    this.map.setView([latitude, longitude], zoom);
  }

  public clearMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

}
