import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent implements OnInit {


  @Input()
  storesList: string[];

  constructor() { }

  ngOnInit() {
  }

  removeStore(store) {
    const index = this.storesList.indexOf(store);
    if (index > -1) {
      this.storesList.splice(index, 1);
    }

  }
}
