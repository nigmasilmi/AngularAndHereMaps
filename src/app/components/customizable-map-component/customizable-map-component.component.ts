import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';

declare const H: any;

@Component({
  selector: 'app-customizable-map-component',
  templateUrl: './customizable-map-component.component.html',
  styleUrls: ['./customizable-map-component.component.css']
})
export class CustomizableMapComponentComponent implements OnInit, AfterViewInit {

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
  }
  public ngAfterViewInit() {
    const platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: this.lat, lng: this.lng }
      }
    );
  }
}
