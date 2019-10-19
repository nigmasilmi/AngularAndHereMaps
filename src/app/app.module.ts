import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoresMapComponent } from './components/stores-map/stores-map.component';
import { StoresListComponent } from './components/stores-list/stores-list.component';



@NgModule({
  declarations: [
    AppComponent,
    StoresMapComponent,
    StoresListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
