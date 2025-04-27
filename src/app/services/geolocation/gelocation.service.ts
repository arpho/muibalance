import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GelocationService {

  constructor(
    private http:HttpClient
  ) { }

  reverseGeocode (latitude: number, longitude: number): Promise<any> {
    console.log(`getting address for ${latitude},${longitude}`)

    return new Promise((resolve, reject) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${environment.GOOGLEapikEY}`
      this.http.get(url).subscribe({
        next:(res)=>{
          resolve(res)
        },
        error:(error)=>{
          reject(error)
        }
      })
    })
  }

  fetchAddresFromCoordinates(latitude: number, longitude: number) {
  }
  getCurrentPosition(): Observable<any> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not available in this browser.');
      }
    });
  }
}
