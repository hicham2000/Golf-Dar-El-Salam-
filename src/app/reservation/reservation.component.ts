import {Component, OnInit} from '@angular/core';
import {DatePipe, formatDate} from "@angular/common";
import {RestapisService} from "../restapis.service";
import {DateFilterFn} from "@angular/material/datepicker";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import emailjs from "@emailjs/browser";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{
  ngOnInit() {


    this.restapi.getUtilisateurs().subscribe(data =>{
      this.users = data;
      this.usersserched = data;
      for (let i = 0; i < this.users.length; i++) {
        const item = this.users[i];
        this.extractedData[item.licence] = item.nom;
      }


    })






  }
login:number = 0;
  username:string = "";
  password:string = "";
  errorMessage:string = ""

  loginuser(){
    if(this.username == "user1" && this.password == "12345"){
      this.login = 1 ;
      this.errorMessage = "";
    }
    else{
      this.errorMessage = "Incorrect password. Please try again";
    }
  }
  extractedData: { [key: number ]: string } = {};
  constructor(private datePipe: DatePipe,private restapi:RestapisService) {
    this.minDate = new Date(); // Set the minimum selectable date to today's date


  }

  hello:any[] = [];
  userreservationdate:string[] = [];

  http(){
    console.log("http")
  }
  m:number = 1;
  dateFilter: DateFilterFn<any>= (date: Date): boolean | any => {
    if(this.m==1){
      this.restapi.getAdminReservations().subscribe(data=>{
        this.data = data;
        this.data1 = [];
        this.data2 = [];

        for (let i=0 ; i< this.data.length; i++){
          const date = this.data[i].startdate + " - " + this.data[i].enddate;
          const parcour = this.data[i].parcour;
          const a = {parcour: parcour, date: date};
          this.data1.push(a);

        }



        for(let i=0 ; i<this.data1.length; i++){
          if (this.data1[i].parcour == this.parcourname){
            const dateRange = this.data1[i].date.split(" - ");
            const startDate = new Date(dateRange[0]);
            const endDate = new Date(dateRange[1]);
            const currentDate = new Date(startDate);

            while (currentDate <= endDate) {
              const formattedDate = formatDate(currentDate, 'dd MMM yyyy', 'en');
              this.data2.push(formattedDate.toUpperCase());
              currentDate.setDate(currentDate.getDate() + 1);
            }
          }

        }



      });
    }
    this.m++;
    if (this.m == 30){
      this.m=1;
    }



    this.userreservationdate = [];


    for(let i=0;i<this.reservations.length ; i++){
      if(this.reservations[i].User_licence == this.licence){
        this.userreservationdate.push(this.reservations[i].date.toUpperCase());
      }
    }

    for (let i=0; i<this.data2.length;i++){
      this.userreservationdate.push(this.data2[i]);
    }



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


  data:any;
  data1:any[] = [];
  data2:any[] = [];

  blockpartenaire:any[] = [];

  blockpartenaire2:any[] = [];

  next(){
    this.restapi.getAdminReservations().subscribe(data=>{
      this.data = data;
      this.data1 = [];
      this.data2 = [];

      for (let i=0 ; i< this.data.length; i++){
        const date = this.data[i].startdate + " - " + this.data[i].enddate;
        const parcour = this.data[i].parcour;
        const a = {parcour: parcour, date: date};
        this.data1.push(a);

      }



      for(let i=0 ; i<this.data1.length; i++){
        if (this.data1[i].parcour == this.parcourname){
          const dateRange = this.data1[i].date.split(" - ");
          const startDate = new Date(dateRange[0]);
          const endDate = new Date(dateRange[1]);
          const currentDate = new Date(startDate);

          while (currentDate <= endDate) {
            const formattedDate = formatDate(currentDate, 'dd MMM yyyy', 'en');
            this.data2.push(formattedDate.toUpperCase());
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }

      }



    });



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


    if(this.pagereserve == 4){
      this.blockpartenaire = [];
      this.blockpartenaire2 = [];
      const formattedDate: string = this.datePipe.transform(this.selected, 'dd MMM yyyy') || '';
      this.restapi.blockpartenaire(this.removeSpaces(formattedDate)).subscribe(data => {
        // @ts-ignore
        this.blockpartenaire = data;
        for (let i= 0; i<this.blockpartenaire.length ; i++){
          this.blockpartenaire2.push(this.blockpartenaire[i].partenaire_1);
          this.blockpartenaire2.push(this.blockpartenaire[i].partenaire_2);
          this.blockpartenaire2.push(this.blockpartenaire[i].partenaire_3);
        }
        console.log(this.blockpartenaire2)
      });


    }






  }

  removeSpaces(inputString: string): string {
    return inputString.split(' ').join('');
  }

  back() {
    this.restapi.getAdminReservations().subscribe(data=>{
      this.data = data;
      this.data1 = [];
      this.data2 = [];

      for (let i=0 ; i< this.data.length; i++){
        const date = this.data[i].startdate + " - " + this.data[i].enddate;
        const parcour = this.data[i].parcour;
        const a = {parcour: parcour, date: date};
        this.data1.push(a);

      }



      for(let i=0 ; i<this.data1.length; i++){
        if (this.data1[i].parcour == this.parcourname){
          const dateRange = this.data1[i].date.split(" - ");
          const startDate = new Date(dateRange[0]);
          const endDate = new Date(dateRange[1]);
          const currentDate = new Date(startDate);

          while (currentDate <= endDate) {
            const formattedDate = formatDate(currentDate, 'dd MMM yyyy', 'en');
            this.data2.push(formattedDate.toUpperCase());
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }

      }



    });

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

    this.restapi.getReservation().subscribe(data=>{
      this.reservations = [];
      this.reservations = data;
      console.log(this.reservations)
      let tmp;

      for(let j=0 ; j< this.reservations.length ; j++){
        for(let i=0; i<this.reservations.length  ; i++){
          if(parseInt(this.reservations[j].heure.split(":")[0]) > parseInt(this.reservations[i].heure.split(":")[0])){
            tmp = this.reservations[j]
            this.reservations[j] = this.reservations[i]
            this.reservations[i] = tmp
          }

          else if(parseInt(this.reservations[j].heure.split(":")[0]) == parseInt(this.reservations[i].heure.split(":")[0])){
            if(parseInt(this.reservations[j].heure.split(":")[1]) > parseInt(this.reservations[i].heure.split(":")[1])){
              tmp = this.reservations[j]
              this.reservations[j] = this.reservations[i]
              this.reservations[i] = tmp
            }

          }



        }
      }

      console.log(this.reservations)



    })
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

  emailtosend:string = "";
  resetPassword(){
    this.login = -1;
  }

  send(){
    if (this.emailtosend == "taibhicham49@gmail.com"){
      emailjs.init('SF24OZcGFhbL-jFzZ')
      emailjs.send("service_sa3va6g","template_8632dcf",{
        to_name: "Hicham2",
        message: "Your password is : 12345",
        email: "taibhicham49@gmail.com",
      });
    }
    this.login = 0;
    this.emailtosend = "";
  }

  usersserched:any = []


  usernametoseache:string = "";
  serche(){

    this.usersserched = [];
    this.licence = 0;
    this.restapi.getusersbyname(this.usernametoseache).subscribe(data => {
      this.usersserched = data;
      console.log(this.usersserched)
    })

    if(this.usernametoseache == ""){
      this.usersserched = this.users.reverse()
    }
  }


  makelicence(licence:number,nom:string){
    this.usernametoseache = nom;
    this.licence = licence;
  }

  dateselected(){
    this.SearchDate = this.transformDateString(this.SearchDate)
    console.log(this.SearchDate)
  }

  transformDateString(dateString: string): any {
    // Parse the input date string
    const date = new Date(dateString);

    // Format the date using DatePipe
    return this.datePipe.transform(date, 'dd MMM yyyy');
  }

}
