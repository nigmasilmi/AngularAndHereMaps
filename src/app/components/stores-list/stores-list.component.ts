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

  // public listArray = Array<any>();
  public listArray = ['cosa1', 'cosa2', 'a'];

  // public listArray: Array<string> = ['a', 'b', 'c'];
  public liReadyToView: string[] = [];


  constructor(private locationsService: LocationsService) {

  }

  ngOnInit() {
   
  }


  removeStore(store) {
    const index = this.listArray.indexOf(store);
    if (index > -1) {
      this.listArray.splice(index, 1);
  }
}


updateReadyList() {
  this.locationsService.temporalList.subscribe(coming => {
    this.liReadyToView.push(coming);
    console.log('this is coming', coming);
  });
}

}
