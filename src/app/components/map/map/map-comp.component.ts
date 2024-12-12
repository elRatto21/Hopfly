import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
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
    this.addUserMarker(await this.getUserLocation());
  }

  private async initializeMap() {
    const userLoc = await this.getUserLocation()
    this.map = L.map('map', {
      center: [userLoc.latitude, userLoc.longitude],
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
    this.entries.filter((entry) => entry.location != null).forEach(entry => {
      const marker = L.marker([entry.location.latitude, entry.location.longitude])
        .bindPopup(`<b>${entry.beer_name}</b>`)
        .addTo(this.map);

      this.markers.push(marker);
    });
  }

  async addUserMarker(location: any) {
    L.marker([location.latitude, location.longitude], { icon: this.createHomeIcon() })
      .bindPopup(`<b>Your location</b>`)
      .addTo(this.map);
  }

  async getUserLocation() {
    const location: Position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true
    });
    return location.coords;
  }

  public centerMap(latitude: number, longitude: number, zoom: number = 13): void {
    this.map.setView([latitude, longitude], zoom);
  }

  public clearMarkers(): void {
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

  createHomeIcon() {
    const homeIconUrl = 'assets/leaflet/images/home-icon.png';
    const iconHome = L.icon({
      iconUrl: homeIconUrl,
      shadowUrl: undefined,
      iconSize: [50, 50],
      iconAnchor: [25, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    })
    return iconHome
  }

}
