import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import storesData from './../../../../store_directory.json';
declare const H: any;

@Component({
  selector: 'app-stores-map',
  templateUrl: './stores-map.component.html',
  styleUrls: ['./stores-map.component.css']
})
export class StoresMapComponent implements OnInit, AfterViewInit {

  public appId = 'SfVZCMMP7oc05mbL7RZE';
  public appCode = 'dtItdasKG20eQREIraLYLg';
  public platform: any;
  // Mexico city coordinates
  public lat = '19.4326';
  public lng = '-99.1332';

  public map: any;
  public ui: any;
  public search: any;

  public width = '100%';
  public height = '500px';

  public actualStoreName: string;
  // public storesList = [];

  public storesList = [];

  @ViewChild('storesMap', { static: true })
  mapElement: ElementRef;


  constructor() { }

  ngOnInit() {
    this.getPlacesInMap();
  }


  ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: this.lat, lng: this.lng }
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
  }
  // function that loads the getPlaces API functionality

  getPlacesInMap() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
  }
  // function that brings the data from the JSON
  // and processes it to a marker for each store in the map
  findStores() {
    this.map.removeObjects(this.map.getObjects());

    for (const store of storesData) {
      const query = store.Name;
      const latIn = store.Coordinates.lat;
      const lngIn = store.Coordinates.lng;
      this.search.request({ q: query, at: latIn + ',' + lngIn }, {}, data => {
        this.dropMarker({ lat: latIn, lng: lngIn }, store);
      }, error => {
        console.error(error);
      });
    }
  }

  dropMarker(coordinates: any, data: any) {
    let bubble: any;
    const marker = new H.map.Marker(coordinates);
    marker.setData('<p>' + data.Name + '</p>');
    marker.addEventListener('tap', event => {
      bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.actualStoreName = data.Name;
      this.addStore(this.actualStoreName);
      this.ui.addBubble(bubble);
    }, true);

    this.map.addObject(marker);
  }

  // removeStore(store) {
  //   const index = this.storesList.indexOf(store);
  //   if (index > -1) {
  //     this.storesList.splice(index, 1);
  //   }

  // }

  addStore(store) {
    this.storesList.push(store);
    // this.elementsToPass.push(store);
    console.log(this.storesList);

  }
}
