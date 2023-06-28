import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestapisService {

  constructor(private http:HttpClient) { }

  Reservation:string = "http://localhost:8080/Reservations";
  utilisateurs:string = "http://localhost:8080/utilisateurs";
  deletereservationurl:string = "http://localhost:8080/Reservations/";
  updatereservationurl:string = "http://localhost:8080/Reservations/";

  addReservation(body:any){
  return this.http.post(this.Reservation,body);
  }

  getReservation(){
    return this.http.get(this.Reservation);
  }

  getUtilisateurs(){
    return this.http.get(this.utilisateurs);
  }

  deleteReservation(id:number){
    return this.http.delete(this.deletereservationurl+id);
  }

  updatereservation(id:number, reservation:any){
    return this.http.put(this.updatereservationurl+id,reservation);
  }
}
