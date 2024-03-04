import { DateService } from './date.service';
import { CartService } from './cart.service';
import { Injectable } from '@angular/core';
import { Trip } from '../shared/ITrip';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { BuiltinType } from '@angular/compiler';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  trips:Observable<any[]>;
  bought:Observable<any[]>;
  dataRef = this.db.list('trips');
  buyRef =this.db.list('bought');
  nextId!: number


  constructor(private db:AngularFireDatabase,private DS: DateService) {
    this.trips =this.dataRef.valueChanges();
    this.bought=this.buyRef.valueChanges();
    // this.dataRef.get().subscribe(change => this.nextId = change.size)
    this.db.list('trips', ref=> ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextId = res[0]?.id+1})


    // console.log(this.trips)
  }
  cart:Trip[]=[];

  addTrip(trip:Trip):void{

    this.dataRef.set(trip.id.toString(),{
      id: trip.id,
      name: trip.name,
      destination: trip.destination,
      startingDate: trip.startingDate,
      endingDate: trip.endingDate,
      reserved: 0,
      quantity:trip.quantity,
      min:0,
      description: trip.description,
      numberofRates:trip.numberOfRates,
      img1: trip.img1,
      img2: trip.img2,
      img3: trip.img3,
      price:trip.price,
      rating:trip.rating
    });
  }
  getTrips(){
    return this.trips;
  }
  changeTrip(key:string,value:number){
    this.dataRef.update(key,{quantity:value})
  }


  removeTrip(index:string){
    this.dataRef.remove(index)
  }
  getNextId(){
    console.log(this.nextId)
    return this.nextId
  }
  updateQuantity(key:string,value:number){
    this.dataRef.update(key,{quantity:value})
  }
  updateReserved(key:string,value:number){
    this.dataRef.update(key,{reserved:value})
  }

  getBought(){
    return this.bought;
  }

buyTrip(trip:Trip){
    this.buyRef.set(trip.id.toString(),{
      id: trip.id,
      state:"-",
      name: trip.name,
      destination: trip.destination,
      startingDate: trip.startingDate,
      endingDate: trip.endingDate,
      boughtDate:this.DS.getDate(),
      quantity:1,
      img1: trip.img1,
      price:trip.price,
      rating:trip.rating
    });
    // console.log(this.DS.getDate())
    this.updateQuantity(trip.id.toString(),trip.quantity-1)
  }
  removeBought(){
    this.buyRef.remove()
  }







}







