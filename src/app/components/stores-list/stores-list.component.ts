import { Component, OnInit} from '@angular/core';
import { LocationsService } from 'src/app/services/locations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})


export class StoresListComponent implements OnInit {

  public actualStoreName: any;
  public btnText = ' a store ';
  public changeBtnBool = false;

  public listArray: Array<string> = ['a', 'b', 'c'];


  constructor() {}

  ngOnInit() {}

  updateList() {
    // this.changeBtnBool = true;
    // this.actualStoreName = this.locationsService.makeStoreAvailable();
    console.log('this.actualStoreName', this.actualStoreName);
    // this.listArray.push(this.actualStoreName);
  }

  removeStore(store) {
    const index = this.listArray.indexOf(store);
    if (index > -1) {
      this.listArray.splice(index, 1);
  }
}

}
