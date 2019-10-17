import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import storesData from './../../../../store_directory.json';
import { LocationsService } from 'src/app/services/locations.service.js';

declare const H: any;

@Component({
  selector: 'app-stores-map',
  templateUrl: './stores-map.component.html',
  styleUrls: ['./stores-map.component.css']
})
export class StoresMapComponent implements OnInit, AfterViewInit {

  @ViewChild('storesMap', { static: true })
  public mapElement: ElementRef;

  private appId = 'SfVZCMMP7oc05mbL7RZE';
  private appCode = 'dtItdasKG20eQREIraLYLg';
  private platform: any;
  // Mexico city coordinates
  private lat = '19.4326';
  private lng = '-99.1332';

  private map: any;
  private ui: any;
  private search: any;

  public width = '100%';
  public height = '500px';

  public actualStoreName: string;
  public updatedStore: string;



  constructor(public locationsService: LocationsService) {}

  ngOnInit() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
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

  storesFinding() {
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


  private dropMarker(coordinates: any, data: any) {
    let bubble: any;
    const marker = new H.map.Marker(coordinates);
    marker.setData('<p>' + data.Name + '</p>');
    marker.addEventListener('tap', event => {
      bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.actualStoreName = data.Name;
      console.log('esto es actualStoreName en el map component: ', this.actualStoreName);
      this.sendStoreToService(this.actualStoreName);
      this.ui.addBubble(bubble);
    }, true);

    this.map.addObject(marker);

  }

  sendStoreToService(catchTheStore: string) {
    catchTheStore = this.actualStoreName;
    console.log('catchTheStore: ', catchTheStore);
    this.locationsService.setStoreComingFromMap(catchTheStore);
  }


}
