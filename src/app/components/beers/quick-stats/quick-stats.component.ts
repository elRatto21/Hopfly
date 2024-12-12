import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand.model';
import { Entry } from 'src/app/models/entry.model';
import { BrandService } from 'src/app/services/brand.service';
import { EntryService } from 'src/app/services/entry.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-quick-stats',
  templateUrl: './quick-stats.component.html',
  styleUrls: ['./quick-stats.component.scss'],
  standalone: true
})
export class QuickStatsComponent  implements OnInit {

  entries: Entry[] = []
  brands: Brand[] = []

  beerAmount!: number
  imageAmount!: number
  favoriteBrand!: string | undefined

  constructor(private entryService: EntryService, private brandService: BrandService, private imageService: ImageService) { }

  async ngOnInit() {
    this.imageAmount = await this.imageService.getImageCount();
    this.entries = await this.entryService.getAllEntries();
    this.brands = await this.brandService.getBrands();

    this.beerAmount = this.entries.length

    const commonBrandId = this.getMostCommonBrandId(this.entries);
    this.favoriteBrand = this.brands.find((brand) => brand.id == commonBrandId)?.name;
  }

  getMostCommonBrandId(entries: any[]): number {
    const brandCounts = entries.reduce((acc, entry) => {
      acc[entry.brand_id] = (acc[entry.brand_id] || 0) + 1;
      return acc;
    }, {});
  
    return Number(Object.entries(brandCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0][0]);
  }

}
