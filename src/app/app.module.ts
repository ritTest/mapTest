import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MaterialAllModule } from './material/material.module';
import { MyAgmExampleComponent } from './map/my-agm-example.component'
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MyAgmExampleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialAllModule,
    AgmCoreModule.forRoot({

      apiKey: 'AIzaSyCRUHhEe-cLrzrBGx2oPexLtyDfZc7M2p0'

      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
