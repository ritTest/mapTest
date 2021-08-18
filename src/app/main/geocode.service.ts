import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(
    private http: HttpClient
  ) { }


  getGeocode(latLong: number[]): Observable<IGeoLoc> {
    return timer(100).pipe(
      mergeMap(_ => this.http.get(`https://api.opencagedata.com/geocode/v1/json?q=${latLong[0]}+${latLong[1]}&key=0efacb983fa94d74b497e78cebabd3f5`) as Observable<IGeoLoc>)
    )
    // return this.http.get(`https://api.opencagedata.com/geocode/v1/json?q=${latLong[0]}+${latLong[1]}&key=0efacb983fa94d74b497e78cebabd3f5`) as Observable<IGeoLoc>
  }


}

export interface IGeoLoc {
  documentation: string;
  licenses: any;
  rate: any;
  results: {
    annotations: {
      DMS: {
        lat: string,
        lng: string
      },
      MGRS: string
    };
    bounds: {
      northeast: {
        lat: number,
        lng: number
      },
      southwest: {
        lat: number,
        lng: number
      }
    };
    components: {
      "ISO_3166-1_alpha-2": "RU" | "EN",
      "ISO_3166-1_alpha-3": "RUS" | "ENG",
      _category: string,
      _type: string,
      city: string,
      city_district: string,
      continent: string,
      country: string,
      country_code: string,
      house_number: string,
      neighbourhood: string,
      political_union: string,
      postcode: string,
      road: string,
      state: string,
      suburb: string,
      village: string
    };
    confidence: number;
    formatted: string;
    geometry: { lat: number, lng: number }
  }[];
  status: { code: number, message: string };
}
