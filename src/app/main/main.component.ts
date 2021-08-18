

import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import { GeocodeService, IGeoLoc } from './geocode.service';
@Component({
  selector: "app-root",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements AfterViewInit, OnInit, OnDestroy {
  title = 'angpj';
  constructor(
    private geocodeS: GeocodeService
  ) { }
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  private map: google.maps.Map;

  private myLatlng = new google.maps.LatLng(51.5, -0.11);

  private mapOptions = {
    zoom: 8,
    center: this.myLatlng,
    mapId: '795bd4d715f5b94e'
  };


  private marker = new google.maps.Marker({
    position: this.myLatlng,
    icon: './assets/marker.png',

    title: 'маркер'
  });

  private icon = {
    url: './assets/circle.png',
    size: new google.maps.Size(16, 16),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(7, 12),
  }

  private trek_marker = new google.maps.Marker({
    position: this.myLatlng,
    icon: this.icon,
  });

  private transitLayer = new google.maps.TransitLayer();

  private trek: any[] = [[51.5, -0.11]];

  private coord: any[] = [];

  private change_pos: boolean = false

  info: IGeoLoc | null = null;

  private info_marker = new google.maps.InfoWindow({
    content: this.info?.results[0].formatted
  })

  private info_trek = new google.maps.InfoWindow({
    content: ''
  })

  checkoutForm: FormGroup



  ngAfterViewInit(): void {
    this.mapInit();
  }

  reproduce(): void {
    let coord_trek = this.coord.concat(this.trek)
    coord_trek.forEach((item, i) => {
      if (item != null) {
        setTimeout(() => {
          this.marker.setPosition(new google.maps.LatLng(item[0], item[1], true));
          if (this.change_pos) {
            this.map.setCenter(new google.maps.LatLng(item[0], item[1], true))
          }
        }, i * 1000);
      }
    })
  }

  change(): void {
    if (this.change_pos == true) {
      this.change_pos = false
    }
    else {
      this.change_pos = true
    }
  }

  mapInit(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    this.marker.addListener('click', () => {
      this.info_marker.close();
      const msg = this.info?.results[0].formatted ?? '';
      this.info_marker.setContent(msg);
      this.info_marker.open(this.map, this.marker);
    });

    this.trek_marker.addListener('click', () => {
      this.info_trek.close()
      this.geocodeS.getGeocode([[this.trek_marker.getPosition()!.lat()], [this.trek_marker.getPosition()!.lng()]]).subscribe(
        res => (
          this.info_trek.setContent(res.results[0].formatted),
          this.info_trek.open(this.map, this.trek_marker)
        )
      )

    });

    this.trek_marker.setMap(this.map);
    this.marker.setMap(this.map);
    this.transitLayer.setMap(this.map);
  }



  del(): void {
    localStorage.clear()
    this.trek = []
    this.trek = [[51.5, -0.11]]
  }

  save(): void {
    if (this.trek.length == 120) {
      this.trek.shift()
    }
    this.trek.push([this.checkoutForm.get('userLAT')!.value, this.checkoutForm.get('userLNG')!.value])
    this.marker.setPosition(new google.maps.LatLng(this.checkoutForm.get('userLAT')!.value, this.checkoutForm.get('userLNG')!.value))
  }

  get_coord(): void {
    let lat = this.marker.getPosition()!.lat()
    let lng = this.marker.getPosition()!.lng()
    this.geocodeS.getGeocode([[lat], [lng]]).subscribe(
      res => {
        // document.getElementById('coords')!.innerText = res.results[0].formatted;
        this.info = res;
      }
    )
  }


  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      userLAT: new FormControl(51.5),
      userLNG: new FormControl(-0.11)
    })

    const onSubmit = (): void => {

      this.checkoutForm.valueChanges.subscribe(changes =>
      (

        this.map.setCenter(new google.maps.LatLng(changes['userLAT'], changes['userLNG'])),
        this.trek_marker.setPosition(new google.maps.LatLng(changes['userLAT'], changes['userLNG']))

      )
      );
    }



    onSubmit();
    let parse_string = JSON.parse(String(localStorage.getItem('items')));
    this.coord = this.coord.concat(parse_string)

  }

  ngOnDestroy(): void {
    let parse_stor = JSON.parse(String(localStorage.getItem('items'))) || [];
    parse_stor = parse_stor.concat(this.trek)
    localStorage.setItem('items', JSON.stringify(parse_stor))
  }
}

