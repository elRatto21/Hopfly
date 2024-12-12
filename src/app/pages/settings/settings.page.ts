import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonList, IonItem, IonToggle, IonTitle } from '@ionic/angular/standalone';
import { LocalNotifications } from '@capacitor/local-notifications';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { alarm, contrast, moon, sunny } from 'ionicons/icons';
import { ReminderSettingsComponent } from "../../components/settings/reminder-settings/reminder-settings.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReminderSettingsComponent]
})
export class SettingsPage implements OnInit {
  darkmode: boolean = false

  constructor() { addIcons({
    alarm, moon, sunny
  }) }

  async ngOnInit() {
    this.darkmode = Boolean(localStorage.getItem("darkmode") === "true")
 
  }

  toggleDarkmode(e: any) {
    document.documentElement.classList.toggle("ion-palette-dark", e.detail.checked)
    localStorage.setItem("darkmode", e.detail.checked)
  }

}
