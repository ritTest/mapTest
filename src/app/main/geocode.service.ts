import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(
    private http: HttpClient
  ) { }


  getGeocode(latLong: number[][]): Observable<IGeoLoc> {
    return this.http.get(`https://api.opencagedata.com/geocode/v1/json?q=${latLong[0]}+${latLong[1]}&key=0efacb983fa94d74b497e78cebabd3f5`) as Observable<IGeoLoc>
  }

  // getGeocode(latLong: number[][]): Observable<IGeoLoc> {
  //   let b = `https://api.opencagedata.com/geocode/v1/json?q=${latLong[0]},${latLong[1]}&pretty=1&key=1a2c33ad8cb344148aa8908876097adb`
  //   let a = this.http.get(b)
  //   return this.http.get(b) as Observable<IGeoLoc>
  // }
}

export interface IGeoLoc {
  documentation: string;
  licenses: any;
  rate: any;
  results: {
    annotations: { DMS: { lat: "54° 0' 9.89172'' N", lng: "81° 59' 58.10028'' E" }, MGRS: "44UNE6550984289" };
    bounds: { northeast: { lat: 54.012343, lng: 82.046137 }, southwest: { lat: 53.992265, lng: 81.7840879 } };
    components: { "ISO_3166-1_alpha-2": "RU", "ISO_3166-1_alpha-3": "RUS", _category: "road", _type: "road" };
    confidence: 6;
    formatted: "unnamed road, Шайдурово, Новосибирская область, Россия"
    geometry: { lat: 54.0027477, lng: 81.9994723 }
  }[];
  status: { code: number, message: string };
}
