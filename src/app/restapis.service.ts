import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Subject,BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestapisService {

  constructor(private http:HttpClient) { }

  Reservation:string = "http://localhost:8080/Reservations";
  utilisateurs:string = "http://localhost:8080/utilisateurs";
  deletereservationurl:string = "http://localhost:8080/Reservations/";
  updatereservationurl:string = "http://localhost:8080/Reservations/";
  adminReservation:string = "http://localhost:8080/AdminReservations";

  addReservation(body:any){
  return this.http.post(this.Reservation,body);
  }


  addAdminReservation(body:any){
    return this.http.post(this.adminReservation,body);
  }

  getAdminReservations(){
    return this.http.get(this.adminReservation);
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

  dates = new Subject<any[]>();
  table: any[] = [];



  alldates = new Subject<any>();

  table2: any[] = [];


}
