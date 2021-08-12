

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
    center: this.myLatlng,
    mapId: '795bd4d715f5b94e'
  };


  private marker = new google.maps.Marker({
    position: this.myLatlng,
    icon: './assets/marker.png',

    title: 'маркер'
  });

  private transitLayer = new google.maps.TransitLayer();

  private trek: any[] = [];

  private coord: any[] = [];

  private change_pos: boolean = false;

  checkoutForm : FormGroup


  ngAfterViewInit(): void {
    this.mapInit();
  }

  reproduce(): void{
    let coord_trek = this.coord.concat(this.trek)
    coord_trek.forEach((item, i) => {
      setTimeout(() => {
        this.marker.setPosition(new google.maps.LatLng(item[0], item[1], true));
        if (this.change_pos){
          this.map.setCenter(new google.maps.LatLng(item[0], item[1]))
        }
      }, i * 1000);
    })
    }

  change(): void{
    if(this.change_pos == true){
      this.change_pos = false}
    else{
      this.change_pos = true
    }
  }

  mapInit(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions
    );

    this.marker.addListener('click', () => {
      let info = new google.maps.InfoWindow({
        content: ' <h3>просто маркер</h3><p>описание места</p>'
      })
      info.open(this.map, this.marker)
    });

    this.marker.setMap(this.map);

    this.transitLayer.setMap(this.map);
  }


  del(): void{
    localStorage.clear()
    this.trek = []
  }

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      userLAT: new FormControl(51.5),
      userLNG: new FormControl(-0.11)
    })


    const not_121 = (): void =>{
      if (this.trek.length == 120){
        this.trek.shift()
      }
    }

    const onSubmit = (): void => {
      this.checkoutForm.valueChanges.subscribe(changes =>
        (
        this.map.setCenter(new google.maps.LatLng(changes['userLAT'], changes['userLNG'])),
        not_121(),
        this.trek.push([changes['userLAT'], changes['userLNG']])
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
    // localStorage.clear()
  }

  }
