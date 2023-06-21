import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import {RestapisService} from "./restapis.service";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  constructor(private datePipe: DatePipe,private restapi:RestapisService) {
  }

  parcourname:string = "Rouge";
  parcourtrou:number = 18;
  licence!:number | null;
  selected!: Date | null;
  heureselected:string = '';
  caddie:boolean = false;
  car:boolean = false;
  parcour!:number;
  reservations:{licence:number,date:string,heure:string,parcour:string}[] =[{
    licence: 344636,
    date: '15 JUN 2023',
    heure: '10:15',
    parcour: 'Rouge | 18 trous'
  },{
    licence: 344636,
    date: '15 JUN 2023',
    heure: '10:15',
    parcour: 'Rouge | 18 trous'
  },{
    licence: 344636,
    date: '17 JUN 2023',
    heure: '10:15',
    parcour: 'Rouge | 18 trous'
  },{
    licence: 344636,
    date: '21 JUN 2023',
    heure: '10:15',
    parcour: 'Rouge | 18 trous'
  },{
    licence: 344636,
    date: '21 JUN 2023',
    heure: '10:15',
    parcour: 'Rouge | 18 trous'
  }];

  users:{licence:number,Name:string,lastname:string;index:number}[] = [{licence: 32324, Name:'Taib' , lastname:'Hicham',index:11.1},
    {licence: 546654, Name:"Taib" , lastname:"Hicham",index:11.1},
    {licence: 4566, Name:"Taib" , lastname:"Hicham",index:11.1},
    {licence: 456, Name:"Taib" , lastname:"Hicham",index:11.1},
    {licence: 4563, Name:"Taib" , lastname:"Hicham",index:11.1},
    {licence: 4753, Name:"Taib" , lastname:"Hicham",index:11.1},
    {licence: 45633, Name:"Taib" , lastname:"Hicham",index:11.1}]

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

    }

  }

  accueil(){
    this.parcourname = "Rouge";
    this.parcourtrou= 18;
    this.licence = null;
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


    this.timeValues = this.apmidi;
    this.timeValues = ["08:00", "08:15", "08:30", "08:45", "09:00",
      "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
      "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30",
      "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45"];




  }
}
