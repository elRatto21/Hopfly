import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, close, camera, location, checkmark } from 'ionicons/icons';
import { IonModal } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';
import { Brand } from '../../../models/brand.model'
import { BrandService } from 'src/app/services/brand.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image.model';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class CreateEntryComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  beerForm!: FormGroup;
  location: { latitude: number; longitude: number } | null = null;
  imageString: string | undefined;

  beerBrands: Brand[] = []

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private imageService: ImageService,
    private entryService: EntryService
  ) {
    addIcons({ add, close, camera, location, checkmark });
  }

  ngOnInit() {
    this.initForm();
    this.brandService.getBrands().then((data) => {
      this.beerBrands = data
    });
  }

  initForm() {
    this.beerForm = this.fb.group({
      beer_name: ['', Validators.required],
      brand_id: ['', Validators.required],
      size: ['', [Validators.required, Validators.min(0)]],
    });
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      this.imageString = image.base64String
    } catch (error) {
      console.error('Camera error:', error);
    }
  }

  async getLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
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
    this.initForm();
    this.imageString = undefined
    this.location = null
  }

  async submit() {
    const formData = { ...this.beerForm.value };
    if (this.imageString != undefined) {
      const image: any | null = await this.imageService.createEntry(this.imageString)
      console.log(image)
      formData.image_id = image.id
    }

    if (this.location) {
      formData.location = this.location
    }

    if (this.beerForm.valid) {
      this.entryService.createEntry(formData);
      this.modal.dismiss(formData, 'confirm');
    }
  }

  onWillDismiss(event: Event) {
    this.initForm();
    this.imageString = undefined
    this.location = null;
  }
}