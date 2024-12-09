import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonList, IonItem, IonToggle, IonTitle } from '@ionic/angular/standalone';
import { LocalNotifications } from '@capacitor/local-notifications';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class SettingsPage implements OnInit {
  isDailyReminderEnabled: boolean = false;
  darkmode: boolean = false

  constructor() { }

  async ngOnInit() {
    this.darkmode = Boolean(localStorage.getItem("darkmode") === "true")
    await this.requestPermissions();

    const pending = await LocalNotifications.getPending();
    this.isDailyReminderEnabled = pending.notifications.length > 0;
  }

  toggleDarkmode(e: any) {
    document.documentElement.classList.toggle("ion-palette-dark", e.detail.checked)
    localStorage.setItem("darkmode", e.detail.checked)
  }

  async requestPermissions() {
    try {
      const result = await LocalNotifications.requestPermissions();
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
    }
  }

  async toggleDailyReminder(event: any) {
    const isEnabled = event.detail.checked;
    
    if (isEnabled) {
      await this.scheduleDailyNotification();
    } else {
      await this.cancelDailyNotification();
    }
  }

  async scheduleDailyNotification() {
    try {
      const now = new Date();
      const nextNotification = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        20,
        0,
        0
      );
      
      if (now.getHours() >= 20) {
        nextNotification.setDate(nextNotification.getDate() + 1);
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: 'Hopfly Daily Reminder',
            body: 'Time to log your drink!',
            schedule: {
              at: nextNotification,
              repeats: true,
              every: 'day'
            },
            sound: "undefined",
            actionTypeId: '',
            extra: null
          }
        ]
      });


    } catch (error) {
      console.error('Error scheduling notification:', error);
      this.isDailyReminderEnabled = false;
    }
  }

  async cancelDailyNotification() {
    try {
      await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
    } catch (error) {
      console.error('Error cancelling notification:', error);
      this.isDailyReminderEnabled = true;
    }
  }

}
