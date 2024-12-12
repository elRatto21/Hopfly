import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalNotifications } from '@capacitor/local-notifications';
import { addIcons } from 'ionicons';
import { alarm, close, time } from 'ionicons/icons';
import { IonModal, IonItem, IonIcon, IonDatetime, IonToggle, IonButton, IonTitle, IonLabel, IonHeader, IonToolbar, IonButtons, IonContent, IonList, IonDatetimeButton } from '@ionic/angular/standalone'

@Component({
  selector: 'app-reminder-settings',
  templateUrl: './reminder-settings.component.html',
  styleUrls: ['./reminder-settings.component.scss'],
  standalone: true,
  imports: [IonDatetimeButton, IonModal, IonItem, IonDatetime, IonDatetimeButton, IonToggle, IonContent, IonList, IonIcon, IonButton, IonTitle, IonLabel, IonHeader, IonToolbar, IonButtons, FormsModule, CommonModule]
})
export class ReminderSettingsComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonDatetime) datetime!: IonDatetime;

  selectedTime: string = '20:00'

  dailyAlarm: boolean = false;

  constructor() {
    addIcons({ alarm, close, time });
  }

  async ngOnInit() {
    this.checkPermissions();
    this.loadCurrentSettings();
    console.log(await LocalNotifications.getPending())
  }

  private async checkPermissions() {
    try {
      const result = await LocalNotifications.requestPermissions();
      if (!result.display) {
        console.log('Notification permissions not granted');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  }

  async onTimeChange(event: any) {
    this.selectedTime = event.detail.value;
    if (this.dailyAlarm) {
      await LocalNotifications.cancel({
        notifications: [
          {
            id: 1
          }
        ]
      })
      await this.createDailyNotification();
    }
  }

  onToggleChange(event: any) {
    this.dailyAlarm = event.detail.checked;
    if (this.dailyAlarm) {
      //this.scheduleNotification();
    } else {
      //this.cancelNotification();
    }
  }

  formatTime(time: string): string {
    try {
      const [hours, minutes] = time.split(':');
      return `${hours}:${minutes}`;
    } catch {
      return time;
    }
  }

  dismiss() {
    this.modal.dismiss();
  }

  async testNoti() {
    const oneMinuteFromNow = new Date();
    oneMinuteFromNow.setSeconds(oneMinuteFromNow.getSeconds() + 5);

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 2,
          title: "Test notification",
          body: "this is a simple test",
          schedule: { at: oneMinuteFromNow }
        }
      ]
    })

    console.log(await LocalNotifications.getPending())
  }

  async getNotis() {
    console.log("current ==>", await LocalNotifications.getPending())
  }

  async toggleDaily(event: any) {
    console.log(event.detail.checked)
    console.log("daily alarM=>", this.dailyAlarm)

    if (this.dailyAlarm == false) {
      await LocalNotifications.cancel({
        notifications: [
          {
            id: 1
          }
        ]
      });
      console.log("Cleared notification with id 1")
      console.log("Pending ==>", await LocalNotifications.getPending())
    } else {
      await this.createDailyNotification();
      console.log("Created daily notifiation with id 1")
      console.log("Pending ==>", await LocalNotifications.getPending())
    }
  }

  async createDailyNotification() {
    const [hours, minutes] = this.selectedTime.split(':').map(Number);

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: "Still alive? 🤨",
          body: "You haven't created an entry in a while 😞 Why don't you crack open a cold one with the bois? 🍻😊",
          schedule: {
            on: {
              hour: hours,
              minute: minutes,
            }, repeats: true
          }
        }
      ]
    })

    console.log("created daily ====>", await LocalNotifications.getPending())
  }

  async checkStatus() {
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      this.dailyAlarm = true
    } else {
      this.dailyAlarm = false
    }
  }

  async loadCurrentSettings() {
    const notifications = (await LocalNotifications.getPending()).notifications;

    if(notifications.length == 0) return;

    const dailyNoti = notifications.filter((notification) => notification.id == 1)[0]

    const hour = dailyNoti.schedule?.on?.hour;
    const minute = dailyNoti.schedule?.on?.hour;

    this.dailyAlarm = true;
    this.selectedTime = hour?.toString().padStart(2, '0') + ":" + minute?.toString().padStart(2, '0')

    console.log("existing setting")
  }
}
