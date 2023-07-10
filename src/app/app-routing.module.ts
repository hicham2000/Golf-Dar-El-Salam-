import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {ReservationComponent} from "./reservation/reservation.component";

const routes: Routes = [
  {path:"Reservation/Admin",component:AdminComponent},
  {path:"Reservation",component:ReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
