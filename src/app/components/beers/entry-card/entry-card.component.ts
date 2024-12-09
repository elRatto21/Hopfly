import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { Entry } from 'src/app/models/entry.model';
import { IonModal } from '@ionic/angular';
import { ImageService } from 'src/app/services/image.service';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrls: ['./entry-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class EntryCardComponent implements OnInit {
  @Input() entry!: Entry
  @Input() brand!: string
  @ViewChild(IonModal) modal!: IonModal;

  imageString = null;

  constructor(private imageService: ImageService, private entryService: EntryService) { }

  async ngOnInit() {
    if (this.entry.image_id != undefined) { this.imageString = await this.imageService.getImage(this.entry.image_id) };
  }

  dismiss() {
    this.modal.dismiss(null, 'cancel');
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Delete',
      role: 'confirm',
      handler: () => {
        this.entryService.deleteById(this.entry.id)
      },
    },
  ];

}
