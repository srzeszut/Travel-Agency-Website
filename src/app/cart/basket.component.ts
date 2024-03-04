import { CartService } from '../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Trip } from '../shared/ITrip';
import { TripsService } from '../services/trips.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{
  trips:Trip[]=[];
  opened=false;
  constructor(private cartService: CartService,private TS:TripsService,private DS:DateService){

  }

  ngOnInit(): void {
    this.trips=this.cartService.displayCart()

  }
  openCart(){
    if(!this.opened){
      this.opened=true;
    }
    else{
      this.opened=false;
    }
  }
  sumElements(cart:Trip[]){
    let sum = 0
    for (let item of cart){
      sum+= item.price
    }
    return sum
  }
  buyTrip(trip:Trip){
    this.TS.buyTrip(trip);

    this.removeTrip(trip)
    // this.TS.removeTrip(trip.id.toString());
  }
  removeTrip(trip:Trip){
    this.cartService.removeFromCart(trip)
  }
  clear(){
    this.cartService.emptyCart()
  }


}
