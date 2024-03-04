import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Trip } from '../shared/ITrip';
import { TripsService } from '../services/trips.service';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent {
  constructor(private TripService: TripsService){
     }

  Subs:Subscription |undefined
  trips:any[]=[];

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
      console.log(this.trips)


    })
    // console.log(this.trips)


  }

  getTrips(){
    return this.trips.slice();
  }



  removeTrip(trip:Trip){
      this.TripService.removeTrip(trip.id.toString())
  }



}
