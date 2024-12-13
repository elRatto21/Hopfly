import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';
import { IonicModule } from '@ionic/angular'
import { addIcons } from 'ionicons';
import { image, location, pencil, trash } from 'ionicons/icons';
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
      trash, image, pencil, location
    })
  }

  async ngOnInit() {
    await this.loadBrands();
    await this.loadEntries();
  }

  async loadEntries() {
    this.entryService.getAllEntries().then((data) => {
      console.log("entries:", data)
      this.entries = data;

      const select = document.querySelector('ion-select');
      if (select && select.value && select.value !== 'none') {
        this.sortEntries({ detail: { value: select.value } });
      }
    })
  }

  async loadBrands() {
    this.brandService.getBrands().then((data) => {
      this.brands = data;
    })
  }

  getBrandById(id: number) {
    return this.brands.find((brand) => brand.id == id)?.name || '';
  }

  groupEntriesByDate() {

  }

  async refresh(event: any) {
    await this.loadEntries();
    await this.loadBrands();
    event.target.complete()
  }

  public async refreshEntries() {
    await this.loadEntries();
    await this.loadBrands();
  }

  sortEntries(event: any) {
    const sortType = event.detail.value;

    if (sortType === 'none') {
      this.entries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return;
    }

    this.entries.sort((a, b) => {
      switch (sortType) {
        case 'date-asc':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'date-desc':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'brand-asc':
          return this.getBrandById(a.brand_id).localeCompare(this.getBrandById(b.brand_id));
        case 'brand-desc':
          return this.getBrandById(b.brand_id).localeCompare(this.getBrandById(a.brand_id));
        case 'size-asc':
          return a.size - b.size;
        case 'size-desc':
          return b.size - a.size;
        default:
          return 0;
      }
    });
  }

}
