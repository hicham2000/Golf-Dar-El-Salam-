import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestapisService {

  constructor(private http:HttpClient) { }

  Reservation:string = "http://localhost:8080/Reservations";

  addReservation(body:any){
  return this.http.post(this.Reservation,body);
  }
}
