import { Injectable } from '@angular/core';
import storesData from './../../../store_directory.json';
import { Observable, Subject } from 'rxjs';

declare const H: any;

@Injectable({
  providedIn: 'root'
})
export class LocationsService {


  constructor() {
    this.temporalList = this.listSubject.asObservable();
  }


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
  public updatedStore: string;

  // data of interest
  public temporalList: Observable<any>;
  private listSubject = new Subject<any>();


  // method that updates the interest data

  updateList(data) {
    this.listSubject.next(data);
    this.temporalList.subscribe(whatComes => {
      console.log('si me suscribo a la data en el servicio esto es lo que trae: ', whatComes);
    });
  }
  // method that loads the getPlaces API functionality

  getPlacesInMap() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
  }


  // method that brings the data from the JSON
  // and processes it to a marker for each store in the map
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

  dropMarker(coordinates: any, data: any) {
    let bubble: any;
    const temporalInsideList: string[] = [];
    const marker = new H.map.Marker(coordinates);
    marker.setData('<p>' + data.Name + '</p>');
    marker.addEventListener('tap', event => {
      bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.actualStoreName = data.Name;
      this.updateList(this.actualStoreName);
      console.log('esto es actualStoreName en el servicio: ', this.actualStoreName);
      this.ui.addBubble(bubble);
    }, true);

    this.map.addObject(marker);
  }


}
