import { TripBought } from './../shared/IBuyTrip';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  currentDate=new Date()

  setDate(date:Date){
    this.currentDate=date
  }
  getDate(){
    return this.currentDate;
  }
  setTripStatus(trip:TripBought){
    if(this.currentDate<new Date(trip.startingDate)){
      trip.state="Oczekuje"

    }
    else if(this.currentDate>new Date(trip.endingDate))
    {
      trip.state="Zakończona"

    }
    else{
      trip.state="W trakcie"
    }
  }

}
