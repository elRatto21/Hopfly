import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { EntryListComponent } from 'src/app/components/home/entry-list/entry-list.component';
import { CreateEntryComponent } from "../../components/home/create-entry/create-entry.component";
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, EntryListComponent, CreateEntryComponent]
})
export class HomePage implements OnInit {

  constructor() {
    addIcons({ close })
   }

  ngOnInit() {
  }

}
