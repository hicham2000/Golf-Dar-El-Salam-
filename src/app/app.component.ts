import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import {RestapisService} from "./restapis.service";
import {NgForm} from "@angular/forms";
import { map } from 'rxjs/operators';
import {DateFilterFn, MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{

  ngOnInit() {
    this.restapi.getReservation().subscribe(data=>{
      this.reservations = data;


    })

    this.restapi.getUtilisateurs().subscribe(data =>{
      this.users = data;
      for (let i = 0; i < this.users.length; i++) {
        const item = this.users[i];
        this.extractedData[item.licence] = item.nom;
      }


    })

  }

  extractedData: { [key: number ]: string } = {};
  constructor(private datePipe: DatePipe,private restapi:RestapisService) {
    this.minDate = new Date(); // Set the minimum selectable date to today's date


  }
  userreservationdate:string[] = [];
  dateFilter: DateFilterFn<any>= (date: Date): boolean | any => {
    this.userreservationdate = [];
    for(let i=0;i<this.reservations.length ; i++){
      if(this.reservations[i].User_licence == this.licence){
        this.userreservationdate.push(this.reservations[i].date.toUpperCase());
      }
    }
    console.log(this.userreservationdate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Disable the date 30 JUN 2023
    const datestring = new Date(year, month, day);
    // @ts-ignore
    const stringdate = this.datePipe.transform(datestring, 'dd MMM yyyy').toUpperCase();

    return !(this.userreservationdate.includes(stringdate));

  }

  // checkdate(){
  //
  //
  //   console.log(this.userreservationdate);
  //
  //   const formattedDate: string = this.datePipe.transform(this.selected, 'dd MMM yyyy') || '';
  //   for (let i = 0; i<this.userreservationdate.length ; i++){
  //     if (this.userreservationdate[i] == formattedDate){
  //       this.dateexict = true;
  //       break;
  //     }
  //     else {
  //       this.dateexict = false;
  //     }
  //   }
  //
  //   this.userreservationdate = [];
  // }


  editpage:number = 0;
  faBackward=faBackward;
  parcourname:string = "Rouge";
  parcourtrou:number = 18;
  licence:number = 0;
  selected!: Date | null;
  heureselected:string = '';
  caddie:boolean = false;
  car:boolean = false;
  parcour!:number;
  reservations:any = [];
  editview:number = 0;


  users:any = [];

  reserver:boolean = false;
  creerCompte:boolean = false;
  liste:boolean = false;
  minDate = new Date();


  faTrash=faTrash;
  faFile=faFile;
  faChevronRight = faChevronRight;
  faChevronLeft=faChevronLeft;
  faPenToSquare = faPenToSquare;
  reserverCounter: number = 0;
  creerCounter:number = 0;
  listeCounter:number =0;
  pagereserve: number = 0;
  pagecreate: number =0;
  pageliste: number = 0;
  SearchDate:string = "";
  nbpartenaire:number = 0;

  timeValues: string[] = ["08:00", "08:15", "08:30", "08:45", "09:00",
    "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30",
    "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45"];

  matin: string[] = ["08:00", "08:15", "08:30", "08:45", "09:00",
    "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45"];

  midi: string[] = ["12:00", "12:15", "12:30", "12:45"];

  apmidi: string[] = ["13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30",
    "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45"];

  tout: string[] = ["08:00", "08:15", "08:30", "08:45", "09:00",
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

  heure(id:number){
    if (id==1){
      this.timeValues = this.tout
      this.heureselected = '';
    }
    else if (id==2){
      this.timeValues = this.matin;
      this.heureselected = '';
    }
    else if(id==3){
      this.timeValues= this.midi;
      this.heureselected = '';
    }
    else if (id==4){
      this.timeValues = this.apmidi;
      this.heureselected = '';
    }
  }

  addCaddie(){
    this.caddie=!this.caddie;
  }

  addCar(){
    this.car = !this.car;
  }

  setparcourname(name:string){
    this.parcourname=name;

  }

  setparcourTrou(trous:number){
    this.parcourtrou=trous;

  }

  setheure(heure:string){
    this.heureselected = heure;
  }


  userselected:number[] = [];
  addpartenaire(licence:number){
    if (this.userselected.includes(licence)) {
      this.nbpartenaire--;
      const index = this.userselected.indexOf(licence);
      if (index !== -1) {
        this.userselected.splice(index, 1);
      }
    }
    else {
      this.nbpartenaire++;
      this.userselected.push(licence);
    }
  }

  dateexict:boolean = false;






  caddieconst:number = 0;
  carconst:number=0;
  valider() {
    this.pagereserve++;
    const formattedDate: string = this.datePipe.transform(this.selected, 'dd MMM yyyy') || '';


    if (this.caddie) {
      this.caddieconst = 1;
    }else {
      this.caddieconst = 0;
    }
    if (this.car){
      this.carconst = 1;
    }
    else {
      this.carconst = 0;
    }
    if (this.parcourtrou == 18) {
      if (this.parcourname == 'Rouge') {
        this.parcour = 1;
      } else if (this.parcourname == 'Bleu') {
        this.parcour = 2;
      }
    } else {
      if (this.parcourname == 'Rouge') {
        this.parcour = 3;
      } else if (this.parcourname == 'Bleu') {
        this.parcour = 4;
      } else if (this.parcourname == 'Vert') {
        this.parcour = 5;
      }
    }
    if (this.userselected.length == 0) {
      const reservation: {
        User_licence: number | null,
        date: string,
        heure: string,
        parcours: number,
        caddie: number,
        vehicule: number
      } = {
        User_licence: this.licence,
        date: formattedDate,
        heure: this.heureselected,
        parcours: this.parcour,
        caddie: this.caddieconst,
        vehicule:this.carconst
      }
      this.restapi.addReservation(reservation).subscribe();
      this.reservations.push(reservation);

    }
    else if (this.userselected.length == 1) {
      const reservation: {
        User_licence: number | null,
        date: string,
        heure: string,
        parcours: number,
        caddie: number,
        vehicule: number,
        partenaire_1: number
      } = {
        User_licence: this.licence,
        date: formattedDate,
        heure: this.heureselected,
        parcours: this.parcour,
        caddie: this.caddieconst,
        vehicule:this.carconst,
        partenaire_1:this.userselected[0]
      }
      this.restapi.addReservation(reservation).subscribe();
      this.reservations.push(reservation);

    }
    else if (this.userselected.length == 2) {
      const reservation: {
        User_licence: number | null,
        date: string,
        heure: string,
        parcours: number,
        caddie: number,
        vehicule: number,
        partenaire_1: number,
        partenaire_2: number

      } = {
        User_licence: this.licence,
        date: formattedDate,
        heure: this.heureselected,
        parcours: this.parcour,
        caddie: this.caddieconst,
        vehicule:this.carconst,
        partenaire_1:this.userselected[0],
        partenaire_2:this.userselected[1]
      }
      this.restapi.addReservation(reservation).subscribe();
      this.reservations.push(reservation);

    }
    else if (this.userselected.length == 3) {
      const reservation: {
        User_licence: number | null,
        date: string,
        heure: string,
        parcours: number,
        caddie: number,
        vehicule: number,
        partenaire_1: number,
        partenaire_2: number,
        partenaire_3: number

      } = {
        User_licence: this.licence,
        date: formattedDate,
        heure: this.heureselected,
        parcours: this.parcour,
        caddie: this.caddieconst,
        vehicule:this.carconst,
        partenaire_1:this.userselected[0],
        partenaire_2:this.userselected[1],
        partenaire_3:this.userselected[2]
      }
      this.restapi.addReservation(reservation).subscribe();
      this.reservations.push(reservation);

    }

  }


  accueil(){
    this.parcourname = "Rouge";
    this.parcourtrou= 18;
    this.licence = 0;
    this.selected = null;
    this.heureselected = '';
    this.caddie = false;
    this.car = false;
    this.reserver = false;
    this.creerCompte = false;
    this.liste = false;
    this.reserverCounter = 0;
    this.creerCounter = 0;
    this.listeCounter = 0;
    this.pagereserve = 0;
    this.pagecreate = 0;
    this.pageliste = 0;
    this.SearchDate = "";
    this.nbpartenaire = 0;
    this.userselected = [];
    this.dateexict = false;
    this.editpage =0;
    this.editview = 0;


    this.timeValues = this.apmidi;
    this.timeValues = ["08:00", "08:15", "08:30", "08:45", "09:00",
      "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
      "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30",
      "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45"];




  }

selectedToEdit:any;
  editreservation(reservation:any){
    this.editpage = 1;
    this.pageliste = 0;
    this.selectedToEdit = reservation;
    console.log(reservation)
  }

  viewreservation(reservation:any){
    this.selectedToEdit = reservation;
    this.pageliste = 0;
    this.editview = 1;
  }


  getTimeDifference(timeToCompare:any,dateString:any): boolean {
    const date = new Date(dateString);
    const today = new Date();

    if(today.toDateString() === date.toDateString()){
      const currentTime = new Date();
      const comparisonTime = new Date(currentTime.toDateString() + " " + timeToCompare);
      const timeDifference = comparisonTime.getTime() - currentTime.getTime();

      const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);
      if (timeDifferenceInHours <= 1 && timeDifferenceInHours >0){
        return true;
      }

    }
    return false;

  }

  delete(id:number){
    this.restapi.deleteReservation(id).subscribe();
    // @ts-ignore
    const indexToDelete = this.reservations.findIndex(record => record.id === id);

    if (indexToDelete !== -1) {
      this.reservations.splice(indexToDelete, 1);
    }
  }

  backtolist(){
    if(this.editview != 0){
      this.editview = 0;
      this.pageliste = 1;
    }
    else if (this.editpage != 0){
      this.editpage = 0;
      this.pageliste = 1;
    }
  }


  update(){
    this.selectedToEdit.heure = this.heureselected;
    this.restapi.updatereservation(this.selectedToEdit.id,this.selectedToEdit).subscribe();
    this.editpage = 0;
    this.pageliste = 1;
  }
}
