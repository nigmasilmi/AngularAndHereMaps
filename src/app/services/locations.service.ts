import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LocationsService {

storeToAdd: any;

  constructor(private locationsService: LocationsService) { }


  setStoreComingFromMap(storeComing: string) {
    console.log('storeComing: ', storeComing);
    this.storeToAdd = storeComing;
    console.log('storeToAdd: ', this.storeToAdd);
  }

  makeStoreAvailable() {
    // console.log('this.storeToAdd: ', this.storeToAdd);
    return this.storeToAdd;
  }

  removeStore() {
    console.log('recycling store');
  }

  takeOutStoresList() {
    console.log('recycling store2');

  }

  clearList() {
    console.log('recycling store3');

  }


}
