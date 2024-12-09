import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment.prod';
import { LoadingController } from "@ionic/angular";
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private supabase: SupabaseClient

  constructor(private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  createLoader() {
    return this.loadingCtrl.create()
  }

  async getAllEntries() {
    const { data, error } = await this.supabase
      .from('entry')
      .select('*')
      .order('created_at', { ascending: false });

    return data || []
  }

  async createEntry(formData: any) {
    const { data, error } = await this.supabase
      .from('entry')
      .insert(formData)
  }
}
