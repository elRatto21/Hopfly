import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Entry } from 'src/app/models/entry.model';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-map-comp',
  templateUrl: './map-comp.component.html',
  styleUrls: ['./map-comp.component.scss'],
  standalone: true
})
export class MapComponent implements AfterViewInit {

  private map!: L.Map;
  private markers: L.Marker[] = [];

  private entries: Entry[] = [];

  private defaultCenter: L.LatLngTuple = [47.508820319182774, 7.616206062342946];
  private userMarker!: L.Marker;
  constructor(private entryService: EntryService) {
    const iconUrl = 'assets/leaflet/images/marker-icon.png';
    const shadowUrl = 'assets/leaflet/images/marker-shadow.png';
    const iconDefault = L.icon({
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  async ngAfterViewInit() {
    setTimeout(() => {
      this.initializeMap();
    }, 50)
    this.entries = await this.entryService.getAllEntries();
    this.addEntryMarkers();
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

  private addEntryMarkers(): void {
    this.entries.forEach(entry => {
      const marker = L.marker([entry.location.latitude, entry.location.longitude])
        .bindPopup(`<b>${entry.beer_name}</b>`)
        .addTo(this.map);

      this.markers.push(marker);
    });
  }



  public centerMap(latitude: number, longitude: number, zoom: number = 13): void {
    this.map.setView([latitude, longitude], zoom);
  }

  public clearMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

}
