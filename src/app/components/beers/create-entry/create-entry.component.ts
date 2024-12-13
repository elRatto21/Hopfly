// src/app/components/create-entry/create-entry.component.ts
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, close, camera, location, checkmark } from 'ionicons/icons';
import { IonModal } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';
import { Brand } from '../../../models/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { ImageService } from 'src/app/services/image.service';
import { EntryService } from 'src/app/services/entry.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class CreateEntryComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() entry?: any; // For edit mode
  @Input() trigger?: string; // Modal trigger ID
  @Output() entryCreated = new EventEmitter<void>();

  beerForm!: FormGroup;
  location: { latitude: number; longitude: number } | null = null;
  imageString: string | undefined;
  beerBrands: Brand[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private imageService: ImageService,
    private entryService: EntryService,
    private toastService: ToastService
  ) {
    addIcons({ add, close, camera, location, checkmark });
  }

  ngOnInit() {
    this.brandService.getBrands().then((data) => {
      this.beerBrands = data;
    });
    
    this.isEditMode = !!this.entry;
    this.initForm();
  }

  initForm() {
    if (this.isEditMode && this.entry) {
      // Edit mode - populate form with existing data
      this.beerForm = this.fb.group({
        beer_name: [this.entry.beer_name, Validators.required],
        brand_id: [this.entry.brand_id, Validators.required],
        size: [this.entry.size, [Validators.required, Validators.min(0)]],
      });
      this.location = this.entry.location;
      // Don't set imageString as we want to show the old image until a new one is taken
    } else {
      // Create mode - empty form
      this.beerForm = this.fb.group({
        beer_name: ['', Validators.required],
        brand_id: ['', Validators.required],
        size: ['', [Validators.required, Validators.min(0)]],
      });
    }
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      this.imageString = image.base64String;
    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  async getLocation() {
    try {
      const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    } catch (error) {
      console.error('Location error:', error);
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.reset();
  }

  async submit() {
    const formData = { ...this.beerForm.value };

    if (this.imageString) {
      const image: any = await this.imageService.createEntry(this.imageString);
      formData.image_id = image.id;
    }

    if (this.location) {
      formData.location = this.location;
    }

    if (this.beerForm.valid) {
      if (this.isEditMode) {
        await this.entryService.updateEntry(this.entry.id, formData);
        this.toastService.createToast("Entry updated successfully")
      } else {
        await this.entryService.createEntry(formData);
        this.toastService.createToast("Entry created successfully")
      }
      await this.modal.dismiss(formData, 'confirm');
      this.entryCreated.emit();
    }
  }

  onWillDismiss(event: Event) {
    this.reset();
  }

  private reset() {
    this.initForm();
    this.imageString = undefined;
    this.location = null;
  }
}