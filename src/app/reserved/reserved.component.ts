import { DateService } from './../services/date.service';
import { TripBought } from './../shared/IBuyTrip';
import { TripsService } from './../services/trips.service';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.css']
})
export class ReservedComponent {
  // notifications!:string[];



  trips:any;
  reservedCounter=0;
  sumCounter=0;
  // notification!:string[]
  constructor(protected CS : CartService,protected TS:TripsService,protected DS:DateService,protected AS:AuthService){
    this.trips=this.TS.getBought()
  }
  Subs:Subscription |undefined

  ngOnInit(): void {

    this.Subs = this.TS.getBought().subscribe(change => {
      this.trips=[]
      // this.notification=[]
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

        // this.checkNotification(toAdd);
        this.DS.setTripStatus(toAdd);
        this.trips.push(toAdd);
      }
    })
  }



  // checkNotification(trip:TripBought){
  //   let today =this.DS.getDate()
  //   let tommorow=today.setDate(today.getDate()+1)
  //   if(trip.startingDate<today){
  //     this.notifications.push(trip.name)
  //     console.log(trip.name)
  //   }




  changeNumber(reserved:number,sum:number):void{
    this.reservedCounter=this.CS.numberOfElements();
    this.sumCounter=this.CS.sumElements()
  }




}
