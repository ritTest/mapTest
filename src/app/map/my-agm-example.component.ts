import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'my-agm-example',
  template: `
  <agm-map [latitude]="lat"

  [longitude]="lng"

  [mapTypeId]="mapType"

  [zoom]="13"
  >
  </agm-map>`,
  styleUrls: ['./my-agm-example.scss'] })
export class MyAgmExampleComponent implements OnInit {
lat = 21.3069;

lng = -157.8583;

mapType = 'satellite';

zoom = 4;
constructor() { }
ngOnInit(): void { }
}
