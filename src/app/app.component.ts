import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


// declare const H: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    public query: string;
    public constructor() {}

    public ngOnInit() { }


}
