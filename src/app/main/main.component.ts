

import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy  } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'angpj';
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;

  private map: google.maps.Map ;

  private myLatlng = new google.maps.LatLng(51.5,-0.11);

  private mapOptions = {
    zoom: 8,
    center: this.myLatlng
  };

  private marker = new google.maps.Marker({
    position: this.myLatlng,
    icon: 'http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png',
    title: 'Лондон'
  });

  private transitLayer = new google.maps.TransitLayer();


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

  private trek: any[] = []

  checkoutForm : FormGroup

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      userLAT: new FormControl(51.5),
      userLNG: new FormControl(-0.11)
    })


    const onSubmit = (): void => {
      this.checkoutForm.valueChanges.subscribe(changes =>
        (this.map.setCenter(new google.maps.LatLng(changes['userLAT'], changes['userLNG'])),
        this.trek.push([changes['userLAT'], changes['userLNG']])
//,        console.log(this.trek)
        )
        );
    }

    onSubmit();
  }

  ngOnDestroy(): void {
    let a  = localStorage.length / 2
    for (let i = 0; i <= this.trek.length - 1; i++){
      localStorage.setItem(`LAN${a + i}`, this.trek[i][0])
//      console.log(`LAN${a / 2 + i}`, this.trek[i][0])
      localStorage.setItem(`LNG${a + i}`, this.trek[i][1])
//      console.log(`LNG${a / 2 + i}`, this.trek[i][1])
    }
    console.log(localStorage)
  }

  }
