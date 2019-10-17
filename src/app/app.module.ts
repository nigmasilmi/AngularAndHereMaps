import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoresMapComponent } from './components/stores-map/stores-map.component';
import { CustomizableMapComponentComponent } from './components/customizable-map-component/customizable-map-component.component';
import { StoresListComponent } from './components/stores-list/stores-list.component';
import { LocationsService } from './services/locations.service';
import { ContainerComponent } from './components/container/container.component';



@NgModule({
  declarations: [
    AppComponent,
    StoresMapComponent,
    CustomizableMapComponentComponent,
    StoresListComponent,
    ContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [LocationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
