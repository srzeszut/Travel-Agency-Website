import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateService } from '../services/date.service';
import { TripsService } from '../services/trips.service';
import { TripBought } from '../shared/IBuyTrip';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  trips:any;
  constructor(private TS:TripsService,private DS:DateService){
    this.trips=this.TS.getBought()
  }
  Subs:Subscription |undefined

  ngOnInit(): void {

    this.Subs = this.TS.getBought().subscribe(change => {
      this.trips=[]
      for(let trip of change){
        const toAdd:TripBought = {
          id: trip.id,
          state:trip.state,
          name: trip.name,
          destination: trip.destination,
          startingDate: trip.startingDate,
          endingDate: trip.endingDate,
          boughtDate:this.DS.getDate(),
          quantity:trip.quantity,
          img1: trip.img1,
          price:trip.price,
          rating:trip.rating

        }


        this.DS.setTripStatus(toAdd);
        this.trips.push(toAdd);
      }
    })
  }

  clearHistory(){
    this.TS.removeBought();
  }
  currentDate!:Date
  onSubmit(){
    this.DS.setDate(this.currentDate);
    console.log(this.currentDate)
  }

}
