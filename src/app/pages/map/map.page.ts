import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MapComponent } from 'src/app/components/map/map/map-comp.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('map')
  mapRef!: any;
  newMap!: any;

  async createMap() {
  }

}