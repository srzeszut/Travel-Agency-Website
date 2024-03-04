import { Injectable, OnInit } from '@angular/core';
import { Trip } from '../shared/ITrip';
import { TripsService } from './trips.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  trips:Trip[]=[]

  ngOnInit(): void {

  }

  setCart(cart:Trip[]){
    this.trips=cart;
    console.log(this.trips)
  }
  addToCart(trip:Trip){
    // this.trips.push(trip);
    // this.trips.forEach( (item, index) => {
    //   if(item === trip) {
    //   this.}
    // });

  }
  removeFromCart(trip:Trip){
    for(let i in this.trips ){
      if(this.trips[i]==trip){
        let index=Number(i)
        this.trips.splice(index,1)
        break;
      }
  }}


  displayCart(){
    return this.trips;
  }

  sumElements(){
    let sum = 0
    for (let item of this.trips){
      sum+= item.price
    }
    return sum
  }
  numberOfElements(){
    return this.trips.length;

  }
  reservedTrips(trip:Trip){
    let sum=0
    for (let item of this.trips){
      if(item.id==trip.id)
        sum++
    }
    // console.log(sum)
    return sum;

  }
  emptyCart(){
    this.trips=[]
  }

}
