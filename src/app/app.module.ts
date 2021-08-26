import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MaterialAllModule } from './material/material.module';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { GeocodeService } from './main/geocode.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialAllModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCarouselModule
  ],
  providers: [GeocodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
