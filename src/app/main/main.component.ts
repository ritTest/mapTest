

import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements AfterViewInit {
  title = 'angpj';
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;

  map: google.maps.Map ;

  myLatlng = new google.maps.LatLng(51.5,-0.11);

  mapOptions = {
    zoom: 8,
    center: this.myLatlng
  };

  marker = new google.maps.Marker({
    position: this.myLatlng,
    icon: 'http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png',
    title: 'Лондон'
  });

  transitLayer = new google.maps.TransitLayer();


  ngAfterViewInit(): void {
    this.mapInit();
  }

  mapInit(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions
    );

    this.marker.addListener('click', () => {
      let info = new google.maps.InfoWindow({
        content: ' <h3>Лондон</h3><p>описание места</p>'
      })
      info.open(this.map, this.marker)
    });

    this.marker.setMap(this.map);

    this.transitLayer.setMap(this.map);
  }

  checkoutForm : FormGroup = new FormGroup({
    userLAT: new FormControl('51.5'),
    userLNG: new FormControl('-0.11')
  })

  onSubmit(): void{
    this.checkoutForm.valueChanges.subscribe(changes =>
      this.map.setCenter(new google.maps.LatLng(changes['userLAT'], changes['userLNG']))
      );

  }



  }

