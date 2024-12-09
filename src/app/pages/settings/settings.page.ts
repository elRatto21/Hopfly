import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonList, IonItem, IonToggle, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonList, IonItem, IonToggle, IonTitle]
})
export class SettingsPage implements OnInit {

  darkmode: boolean = false

  constructor() { }

  ngOnInit() {
    this.darkmode = Boolean(localStorage.getItem("darkmode") === "true")
  }

  toggleDarkmode(e: any) {
    document.documentElement.classList.toggle("ion-palette-dark", e.detail.checked)
    localStorage.setItem("darkmode", e.detail.checked)
  }

}
