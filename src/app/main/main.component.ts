

import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements AfterViewInit {
  title = 'angpj';
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;

  map: google.maps.Map ;

  myLatlng = new google.maps.LatLng(-40.397, 150.644);

  mapOptions = {
    zoom: 8,
    center: this.myLatlng,
    mapTypeId: 'satellite'
  };

  marker = new google.maps.Marker({
    position: this.myLatlng,
    icon: 'http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png',
    title: 'место'
  });


  ngAfterViewInit(): void {
    this.mapInit();
  }

  mapInit(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions
    );

    this.marker.addListener('click', () => {
      let info = new google.maps.InfoWindow({
        content: ' <h3>место в океане</h3><p>описание места</p>'
      })
      info.open(this.map, this.marker)
    });

    this.marker.setMap(this.map);
  }




  }

