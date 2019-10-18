import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { LocationsService } from 'src/app/services/locations.service.js';
declare const H: any;

@Component({
  selector: 'app-stores-map',
  templateUrl: './stores-map.component.html',
  styleUrls: ['./stores-map.component.css']
})
export class StoresMapComponent implements OnInit, AfterViewInit {

  width = this.locationsService.width;
  height = this.locationsService.height;

  @ViewChild('storesMap', { static: false })
  mapElement: ElementRef;

  // public interestData = Array<any>();
  public interestData = ['uno', 'dos', 'tres'];


  constructor(public locationsService: LocationsService) {
    this.locationsService.updateList(this.interestData);

  }

  ngOnInit() {
    this.locationsService.getPlacesInMap();
  }


  ngAfterViewInit() {
    const defaultLayers = this.locationsService.platform.createDefaultLayers();
    this.locationsService.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: this.locationsService.lat, lng: this.locationsService.lng }
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.locationsService.map));
    this.locationsService.ui = H.ui.UI.createDefault(this.locationsService.map, defaultLayers);
  }

  findStores() {
    this.locationsService.storesFinding();
  }


}
