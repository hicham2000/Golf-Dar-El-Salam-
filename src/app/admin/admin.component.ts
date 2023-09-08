import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {RestapisService} from "../restapis.service";
import {DatePipe, formatDate} from "@angular/common";
import {DateFilterFn, MatDateRangePicker} from "@angular/material/datepicker";

import emailjs from "@emailjs/browser"
import {faBackward, faFile, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  data:any;
  faBackwardg=faBackward;
  data1:any[] = [];
  data2:any[] = [];

  users:any = [];
  cancellednumber:any = [];
  reservationnumber:any = [];
  ngOnInit() {
    this.all = this.restapi.table2;

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







    });


    this.restapi.getUtilisateurs().subscribe(data=>{
      this.users = data;
      for (let i= 0 ; i<this.users.length ; i++){
        this.restapi.getnumberofcancelled(this.users[i].licence).subscribe(data=>{
          this.restapi.getnumberofreservation(this.users[i].licence).subscribe(data2=>{

            this.alldata.push({"licence": this.users[i].licence, "name": this.users[i].nom, "cancelled":data, "numberreserve":data2});

          })
        })
      }
    })



  }

  all:any[] = [];
  constructor(private restapi:RestapisService,private datePipe: DatePipe) {
    this.minDate = new Date(); // Set the minimum selectable date to today's date
  }

startdate:any;
enddate:any;
message:any;

  parcourname:string = "Rouge";
  setparcourname(parcour:string){
  if (this.parcourname != parcour){
    this.startdate = null;
    this.enddate = null;
  }
    this.parcourname = parcour;
  }


  minDate = new Date();

  login = 0;
  username:string = "";
  password:string = "";
  errorMessage:string = ""

  loginuser(){
    if(this.username == "admin" && this.password == "admin123"){
      this.accuilpageshow = 1;
      this.errorMessage = "";
    }
    else{
      this.errorMessage = "Incorrect password. Please try again";
    }
  }

  reserver(){
    this.accuilpageshow = 0;
    this.login = 1;
  }


  alldata:any = [];
  alldata2:any = [];
  sum:number = 0;
  getsummary(){
    this.sum = 1;








  }


  // Callback function to disable weekends


  dateFilter: DateFilterFn<any>= (date: Date): boolean | any => {

    this.data2 = [];
    for(let i=0; i< this
.data1.length;i++){

      if(this.data1[i].parcour == this.parcourname){

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
      }


    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Disable the date 30 JUN 2023
    const datestring = new Date(year, month, day);
    // @ts-ignore
    const stringdate = this.datePipe.transform(datestring, 'dd MMM yyyy').toUpperCase();




    return !(this.data2.includes(stringdate));

  }


  valider(){
    const formattedstartDate: string = this.datePipe.transform(this.startdate, 'dd MMM yyyy') || '';
    const formattedendtDate: string = this.datePipe.transform(this.enddate, 'dd MMM yyyy') || '';
    const data = {parcour:this.parcourname,startdate: formattedstartDate, enddate: formattedendtDate, note: this.message};
    this.restapi.addAdminReservation(data).subscribe();
    this.startdate = null;
    this.enddate = null;
    this.message=null;
    const date = formattedstartDate + " - " + formattedendtDate ;

    const dateRange = date.split(" - ");
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const formattedDate = formatDate(currentDate, 'dd MMM yyyy', 'en');
      this.all.push(formattedDate.toUpperCase());
      currentDate.setDate(currentDate.getDate() + 1);
    }


    const a = {parcour: this.parcourname, date: date};
    this.data1.push(a);





  }

  resetPassword(){
    this.login = -1;

  }

  emailtosend:string = "";

  send(){
    if (this.emailtosend == "taibhicham8@gmail.com"){
      emailjs.init('SF24OZcGFhbL-jFzZ')
      emailjs.send("service_sa3va6g","template_8632dcf",{
        to_name: "Hicham",
        message: "Your password is : admin123",
        email: "taibhicham8@gmail.com",
      });
    }
    this.login = 0;
    this.emailtosend = "";
  }

  accuilpageshow = 0;

  accueil(){
this.sum = 0;
    this.login = 0;
    this.accuilpageshow = 1;
this.alldata = [];
    this.restapi.getUtilisateurs().subscribe(data=>{
      this.users = data;
      for (let i= 0 ; i<this.users.length ; i++){
        this.restapi.getnumberofcancelled(this.users[i].licence).subscribe(data=>{
          this.restapi.getnumberofreservation(this.users[i].licence).subscribe(data2=>{
            this.alldata.push({"licence": this.users[i].licence, "name": this.users[i].nom, "cancelled":data, "numberreserve":data2});

          })
        })
      }
    })

  }


  protected readonly faFile = faFile;
  protected readonly faPenToSquare = faPenToSquare;
  protected readonly faTrash = faTrash;
  protected readonly faBackward = faBackward;
}
