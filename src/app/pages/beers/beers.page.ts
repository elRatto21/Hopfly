import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { EntryListComponent } from 'src/app/components/beers/entry-list/entry-list.component';
import { CreateEntryComponent } from "../../components/beers/create-entry/create-entry.component";
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { QuickStatsComponent } from 'src/app/components/beers/quick-stats/quick-stats.component';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.page.html',
  styleUrls: ['./beers.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, EntryListComponent, CreateEntryComponent, QuickStatsComponent]
})
export class BeersPage implements OnInit {
  @ViewChild(EntryListComponent) entryList!: EntryListComponent;

  constructor() {
    addIcons({ close })
  }

  ngOnInit() {
  }

  async refreshEntries() {
    await this.entryList.refreshEntries();
  }

}
