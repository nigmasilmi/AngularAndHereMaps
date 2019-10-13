import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

declare const H: any;

@Component({
  selector: 'app-customizable-map-component',
  templateUrl: './customizable-map-component.component.html',
  styleUrls: ['./customizable-map-component.component.css']
})
export class CustomizableMapComponentComponent implements OnInit, AfterViewInit {
  private platform: any;
  private map: any;
  private ui: any;
  private search: any;


  @ViewChild('customap', { static: true })
  public mapElement: ElementRef;

  @Input()
  public appId: any;

  @Input()
  public appCode: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  constructor() { }

  ngOnInit() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
  }
  public ngAfterViewInit() {
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

  public places(query: string) {
    this.map.removeObjects(this.map.getObjects());
    this.search.request({ q: query, at: this.lat + ',' + this.lng }, {}, data => {
      for (const item of data.results.items) {
        this.dropMarker({ lat: item.position[0], lng: item.position[1] }, item);
      }
    }, error => {
      console.error(error);
    });
  }

  private dropMarker(coordinates: any, data: any) {
    const marker = new H.map.Marker(coordinates);
    marker.setData('<p>' + data.title + '<br>' + data.vicinity + '</p>');
    marker.addEventListener('tap', event => {
      const bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  }
}
