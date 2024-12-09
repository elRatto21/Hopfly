import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';
import { LoadingController } from "@ionic/angular";
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private supabase: SupabaseClient

  constructor(private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  createLoader() {
    return this.loadingCtrl.create()
  }

  async createEntry(base64: string): Promise<Image> {
    const { data, error } = await this.supabase
      .from('image')
      .insert(
        {
          base64: base64
        }
      )
      .select()
      .single()

    return data;
  }
}
