import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
  standalone: true
})
export class EntryListComponent implements OnInit {

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAllEntries().then((data) => {
      console.log("entries:", data)
    })
  }

}
