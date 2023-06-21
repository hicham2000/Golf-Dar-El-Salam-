import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestapisService {

  constructor(private http:HttpClient) { }

  Reservation:string = "http://localhost:8080/Reservations";
  utilisateurs:string = "http://localhost:8080/utilisateurs";

  addReservation(body:any){
  return this.http.post(this.Reservation,body);
  }

  getReservation(){
    return this.http.get(this.Reservation);
  }

  getUtilisateurs(){
    return this.http.get(this.utilisateurs);
  }
}
