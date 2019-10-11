import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare const H: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

    private platform: any;

    @ViewChild('map', {static: true})
    public mapElement: ElementRef;

    public constructor() {
        this.platform = new H.service.Platform({
            app_id: 'SfVZCMMP7oc05mbL7RZE',
            app_code: 'dtItdasKG20eQREIraLYLg'
        });
    }

    public ngOnInit() { }

    public ngAfterViewInit()  {
        const defaultLayers = this.platform.createDefaultLayers();
        const map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 12,
                center: { lat: 8.9259, lng: -67.4310}
            }
        );
    }

}
