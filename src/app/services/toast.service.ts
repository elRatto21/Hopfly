import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async createToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
    })

    await toast.present()
  }
}
