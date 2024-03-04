import { TripsService } from './../services/trips.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../shared/ITrip';
import { Post } from '../shared/IPost';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  constructor(private route:ActivatedRoute,private tripsService:TripsService,private CS:CartService,private AS:AuthService){
    this.cart=this.CS.displayCart();
  }
  trip!:Trip
  posts:Post[]=[]
  cart:Trip[];

  id!:number
  // imagesEl!: HTMLElement[];
  currentImg!: number;

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.id=params['id'];
    })

    this.tripsService.getTrips().subscribe(
      change => this.trip=change[this.id]


    )


  }
  addPost(post:Post){
    this.posts.push(post)
    // console.log(post)
    console.log(this.posts)
    if(this.AS.currentRole!='manager'){
      this.trip.numberOfRates++
      let rating=((this.trip.rating*this.trip.numberOfRates-1)+post.rate)/this.trip.numberOfRates
      // this.trip.numberOfRates++
      this.trip.rating=Number(rating.toPrecision(2))


    }

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
showAmount(trip:Trip){
  return trip.quantity- this.CS.reservedTrips(trip);
}
}




