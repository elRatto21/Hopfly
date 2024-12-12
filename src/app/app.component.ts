import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {IonicModule} from '@ionic/angular'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    document.documentElement.classList.toggle("ion-palette-dark", localStorage.getItem("darkmode") === "true")
  }
}
