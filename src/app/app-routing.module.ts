import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TripsComponent } from './trips/trips.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { BasketComponent } from './cart/basket.component';
import { HistoryComponent } from './history/history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TripComponent } from './trip/trip.component';
import { ReservedComponent } from './reserved/reserved.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { AdminGuard } from './guard/admin.guard';
import { ManagerGuard } from './guard/manager.guard';
import { DetailsGuard } from './guard/details.guard';


const routes:Routes =[
  {path:'home',component:HomepageComponent},
  {path:'trips',component:TripsComponent},
  {path:'trips/:id',component:TripComponent,canActivate:[DetailsGuard]},
  {path:'add-trip',component:AddTripComponent,canActivate:[AuthGuard]},
  {path:'cart',component:BasketComponent,canActivate:[AuthGuard]},
  {path:'history',component:HistoryComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin',component:AdminViewComponent,canActivate:[AdminGuard]},
  {path:'manage',component:ManagerViewComponent,canActivate:[ManagerGuard]},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**',component: PageNotFoundComponent},



  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
