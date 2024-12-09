import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/models/entry.model';
import { EntryService } from 'src/app/services/entry.service';
import { IonicModule } from '@ionic/angular'
import { addIcons } from 'ionicons';
import { image, pencil, trash } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { EntryCardComponent } from '../entry-card/entry-card.component';
import { Brand } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, EntryCardComponent]
})
export class EntryListComponent implements OnInit {

  entries: any[] = [];
  brands: Brand[] = [];

  constructor(private entryService: EntryService, private brandService: BrandService) {
    addIcons({
      trash, image, pencil
    })
  }

  ngOnInit() {
    this.loadEntries();
    this.loadBrands();
  }

  async loadEntries() {
    this.entryService.getAllEntries().then((data) => {
      console.log("entries:", data)
      this.entries = data;
    })
  }

  async loadBrands() {
    this.brandService.getBrands().then((data) => {
      this.brands = data;
    })
  }

  getBrandById(id: number) {
    return this.brands.filter((brand) => brand.id == id)[0].name;
  }

  groupEntriesByDate() {

  }

}
