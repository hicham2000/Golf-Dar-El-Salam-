import { Component } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {

  selected!: Date | null;

  reserver:boolean = false;
  creerCompte:boolean = false;
  liste:boolean = false;



  faChevronRight = faChevronRight;
  faChevronLeft=faChevronLeft;
  reserverCounter: number = 0;
  creerCounter:number = 0;
  listeCounter:number =0;
  pagereserve: number = 0;
  pagecreate: number =0;
  pageliste: number = 0;

  timeValues: string[] = ["08:00", "08:15", "08:30", "08:45", "09:00",
    "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30",
    "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45"];


  next(){
    if (this.reserver){
      this.reserverCounter++;
      this.pagereserve++;
    }
    else if(this.creerCompte){
      this.creerCounter++;
      this.pagecreate++;
    }
    else if (this.liste){
      this.listeCounter++;
      this.pageliste++;
    }
  }

  back() {
    if (this.reserver){
      this.reserverCounter--;
      this.pagereserve--;
    }
    else if (this.creerCompte){
      this.creerCounter--;
      this.pagecreate--;
    }
    else if (this.liste){
      this.listeCounter--;
      this.pageliste--;
    }
  }

  ReserverPage() {
    this.reserver = true;
    this.creerCompte = false;
    this.liste=false;
    this.pagereserve=1;
    this.reserverCounter=1;
  }

  CreerComptePage() {
    this.creerCompte = true;
    this.reserver = false;
    this.liste=false;
    this.pagecreate=1;
    this.creerCounter=1;
  }

  ListePage(){
    this.liste=true;
    this.reserver=false;
    this.creerCompte=false;

    this.pageliste=1;
    this.listeCounter=1;

  }
}
