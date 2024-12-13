import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { Entry } from 'src/app/models/entry.model';
import { IonModal } from '@ionic/angular';
import { ImageService } from 'src/app/services/image.service';
import { EntryService } from 'src/app/services/entry.service';
import { CreateEntryComponent } from "../create-entry/create-entry.component";
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-entry-card',
  templateUrl: './entry-card.component.html',
  styleUrls: ['./entry-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, CreateEntryComponent]
})
export class EntryCardComponent implements OnInit {
  @Input() entry!: Entry
  @Input() brand!: string
  @ViewChild(IonModal) modal!: IonModal;
  @Output() entryDeleted = new EventEmitter<void>();

  imageString = null;

  constructor(private imageService: ImageService, private entryService: EntryService, private toastService: ToastService) { }

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
        this.toastService.createToast("Entry deleted successfully")
        this.entryDeleted.emit();
      },
    },
  ];

  formatDate(dateStr: string) {
    const date = new Date(dateStr)

    return (
      date.getDay().toString().padStart(2, '0') + "." + 
      date.getMonth().toString().padStart(2, '0') + "." + 
      date.getFullYear()
    )
  }

}
