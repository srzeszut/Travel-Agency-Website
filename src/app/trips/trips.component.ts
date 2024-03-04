import { CartService } from './../services/cart.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from '../shared/ITrip';
import { TripsService } from '../services/trips.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit{

  reserved =0;
  trips:any[]=[];
  cart:Trip[];


  constructor(private CS:CartService,
    private TripService: TripsService,protected AS:AuthService){
      this.cart=this.CS.displayCart();
     }

  Subs:Subscription |undefined

  ngOnInit(): void {
    console.log("dziala")

    this.Subs = this.TripService.getTrips().subscribe(change => {
      this.trips=[]
      for(let trip of change){
        const toAdd:Trip = {
          id: trip.id,
          name: trip.name,
          destination: trip.destination,
          startingDate: trip.startingDate,
          endingDate: trip.endingDate,
          reserved: trip.reserved,
          quantity:trip.quantity,
          numberOfRates:trip.numberOfRates,
          min:0,
          description: trip.description,
          img1: trip.img1,
          img2: trip.img2,
          img3: trip.img3,
          price:trip.price,
          rating:trip.rating

        }

        this.trips.push(toAdd);

      }
      // console.log(this.trips)


    })
    // console.log(this.trips)


  }


  getTrips(){
    return this.trips.slice();
  }

  reserveTrip(trip:Trip){
    // console.log(trip.reserved)

    if(this.showAmount(trip)>0){
      trip.reserved=this.showAmount(trip)+1;
      this.cart.push(trip);

      // this.CS.setCart(this.AS.currentUID,this.cart);
      this.CS.setCart(this.cart);


  }


}
resignTrip(trip:Trip){
  this.cart=this.CS.displayCart();
  console.log("koszyk")
  console.log(this.cart)
  if(this.showAmount(trip)<trip.quantity){
    trip.reserved=this.showAmount(trip)-1;
    for(let i in this.cart ){
      if(this.cart[i]==trip){
        let index=Number(i)
        this.cart.splice(index,1)
        break;
      }
    }
    console.log("wkosxyku "+this.CS.reservedTrips(trip))
    console.log(trip.quantity-this.CS.reservedTrips(trip))
    // console.log(this.cart)
    // this.AS.setCart(this.AS.currentUID,this.cart);
    this.CS.setCart(this.cart);
  }

}
  cheapest(){
    let minPrice = Infinity;
    for(let t of this.trips){
      if(t.price<minPrice&& t.quantity>t.reserved){
        minPrice=t.price;
      }

    }

    return minPrice;
  }
  mostExpensive(){
    let maxPrice = 0;
    for(let t of this.trips){
      if(t.price>maxPrice &&t.quantity>t.reserved){
        maxPrice=t.price;
      }

    }

    return maxPrice;
  }


  addReview(star:number,trip:Trip){
    trip.rating=star;


// }

}
showAmount(trip:Trip){
  // console.log(trip.quantity-this.CS.reservedTrips(trip))
  return trip.quantity- this.CS.reservedTrips(trip);
}


}



