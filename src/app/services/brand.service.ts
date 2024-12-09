import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';
import { LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private supabase: SupabaseClient

  constructor(private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  createLoader() {
    return this.loadingCtrl.create()
  }

  async getBrands() {
    const { data, error } = await this.supabase
      .from('brand')
      .select('*')
      .order('name')

    return data || []
  }
}
