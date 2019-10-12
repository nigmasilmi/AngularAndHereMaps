import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoresMapComponent } from './components/stores-map/stores-map.component';
import { CustomizableMapComponentComponent } from './components/customizable-map-component/customizable-map-component.component';

@NgModule({
  declarations: [
    AppComponent,
    StoresMapComponent,
    CustomizableMapComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
