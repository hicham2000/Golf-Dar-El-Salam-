import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {DatePipe, formatDate} from '@angular/common';
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
constructor(private restapi:RestapisService) {
}

data:any;
  ngOnInit() {

  }

}
