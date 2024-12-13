import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFabButton, IonFab, IonIcon, } from '@ionic/angular/standalone';
import { EntryListComponent } from 'src/app/components/beers/entry-list/entry-list.component';
import { CreateEntryComponent } from "../../components/beers/create-entry/create-entry.component";
import { addIcons } from 'ionicons';
import { close, add } from 'ionicons/icons';
import { QuickStatsComponent } from 'src/app/components/beers/quick-stats/quick-stats.component';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.page.html',
  styleUrls: ['./beers.page.scss'],
  standalone: true,
  imports: [IonFab, IonIcon, IonFabButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, EntryListComponent, CreateEntryComponent, QuickStatsComponent]
})
export class BeersPage implements OnInit {
  @ViewChild(EntryListComponent) entryList!: EntryListComponent;

  constructor() {
    addIcons({add,close});
  }

  ngOnInit() {
  }

  async refreshEntries() {
    await this.entryList.refreshEntries();
  }

}
