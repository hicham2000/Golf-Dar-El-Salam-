import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {RestapisService} from "../restapis.service";
import {DatePipe, formatDate} from "@angular/common";
import {DateFilterFn, MatDateRangePicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  data:any;
  data1:any[] = [];
  data2:any[] = [];
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
    this.startdate = "";
    this.enddate = "";
  }
    this.parcourname = parcour;
  }


  minDate = new Date();



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


}
