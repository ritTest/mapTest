

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
  @ViewChild('checkbox', { static: false }) checkbox: any = false;
  private map: google.maps.Map ;

  private myLatlng = new google.maps.LatLng(51.5,-0.11);

  private mapOptions = {
    zoom: 8,
    center: this.myLatlng
  };

  private marker = new google.maps.Marker({
    position: this.myLatlng,
    icon: 'http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png',
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
      for (let i = 0; i < this.coord.length; i++) {
        if (this.coord[i] != undefined){
          ((index) => {
              setTimeout(() => {
                this.marker.setPosition(new google.maps.LatLng(this.coord[index][0], this.coord[index][1], true));
                console.log(this.change_pos)
                if (this.change_pos){
                  this.map.setCenter(new google.maps.LatLng(Number(this.marker.getPosition()?.lat()),Number(this.marker.getPosition()?.lng())))
                }
              }, i * 1000);
          })(i);
    }
  }
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
// ,        console.log(this.trek)
        )
        );
    }

    onSubmit();


    let ls_l = localStorage.length
    for(let i=0; i < ls_l; i++){
      let parse_string = JSON.parse(String(localStorage.getItem(String(i))));
      this.coord = this.coord.concat(parse_string)
    }
    console.log(this.coord)
  }

  ngOnDestroy(): void {
    localStorage.setItem(`${localStorage.length}`, JSON.stringify(this.trek))
    //  localStorage.clear()
    console.log(localStorage)
  }

  }
