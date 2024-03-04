
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { ReservedComponent } from './reserved/reserved.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { FilterComponent } from './filter/filter.component';
import { FilterPipePipe } from './shared/filter-pipe.pipe';
import { BasketComponent } from './cart/basket.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HistoryComponent } from './history/history.component';
import { TripComponent } from './trip/trip.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ReviewPostComponent } from './review-post/review-post.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';





@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    ReservedComponent,
    AddTripComponent,
    RatingComponent,
    FilterComponent,
    FilterPipePipe,
    BasketComponent,
    NavbarComponent,
    HomepageComponent,
    HistoryComponent,
    TripComponent,
    ReviewPostComponent,
    LoginComponent,
    RegisterComponent,
    ManagerViewComponent,
    AdminViewComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,

    // AngularFirestoreModule

  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
