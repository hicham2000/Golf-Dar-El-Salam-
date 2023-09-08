import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
  partenaireblock:string = "http://localhost:8080/Reservations/";
  userselectedbyname:string = "http://localhost:8080/utilisateurs/";
  numberofcancelled:string = "http://localhost:8080/Reservationcancelled/";
  numberofreservation:string = "http://localhost:8080/Reservationnumber/";



  getnumberofcancelled(id:any){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`user1:12345`)
    });

    return this.http.get(this.numberofcancelled+id,{ headers })
  }

  getnumberofreservation(id:any){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`user1:12345`)
    });

    return this.http.get(this.numberofreservation+id,{ headers })
  }

  getusersbyname(name:string){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`user1:12345`)
    });
    return this.http.get(this.userselectedbyname+name,{ headers });

  }
  blockpartenaire(date:string){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`user1:12345`)
    });

    return this.http.get(this.partenaireblock+date,{ headers });
}

  addReservation(body:any){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`user1:12345`)
    });
  return this.http.post(this.Reservation,body,{ headers });
  }


  addAdminReservation(body:any){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`user1:12345`)
    });
    return this.http.post(this.adminReservation,body,{ headers });
  }

  getAdminReservations(){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`user1:12345`)
    });
    return this.http.get(this.adminReservation,{ headers });
  }

  getReservation(){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`user1:12345`)
    });

    return this.http.get(this.Reservation,{ headers });
  }

  getUtilisateurs(){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`user1:12345`)
    });
    return this.http.get(this.utilisateurs,{ headers });
  }

  deleteReservation(id:number){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`user1:12345`)
    });
    return this.http.delete(this.deletereservationurl+id,{ headers });
  }

  updatereservation(id:number, reservation:any){
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`user1:12345`)
    });
    return this.http.put(this.updatereservationurl+id,reservation,{ headers });
  }

  dates = new Subject<any[]>();
  table: any[] = [];



  alldates = new Subject<any>();

  table2: any[] = [];


}
