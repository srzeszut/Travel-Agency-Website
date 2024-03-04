import { TripsService } from './../services/trips.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Trip } from '../shared/ITrip';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent  {
  form:FormGroup;

  constructor(private TripsService:TripsService){
    this.form = new FormGroup({

      name:new FormControl( '',[
        Validators.required,
        Validators.maxLength(17),
        // Validators.pattern("[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9]*"),
        Validators.minLength(2)
      ]),
      destination:new FormControl('', [
        Validators.required,
        Validators.maxLength(18),
        Validators.pattern("[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*"),
        Validators.minLength(1),

      ]),
      startingDate:new FormControl('', [
        Validators.required,

      ]),
      endingDate:new FormControl('', [
        Validators.required,

      ]),
      description:new FormControl('', [
        Validators.required,
        Validators.maxLength(102),
        // Validators.pattern("[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*"),
        Validators.minLength(1)

      ]),
      price:new FormControl('', [
        Validators.required,
        Validators.maxLength(18),
        Validators.pattern("[0-9]|[1-9][0-9]*"),
        Validators.minLength(1)

      ]),
      quantity:new FormControl('', [
        Validators.required,
        Validators.maxLength(18),
        Validators.pattern("[0-9]|[1-9][0-9]*"),
        Validators.minLength(1)
      ]),
      img:new FormControl('', [
        Validators.required,
        // Validators.pattern("[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*"),
        Validators.minLength(1),

      ]),

    });
  }



  @Output()
  emiter = new EventEmitter<Trip>();


  formGood =false;
  formBad =false;

      onSubmit(){
        this.formGood =false;
        this.formBad =false;
        if (!this.form.valid) {
          // console.log(this.TripsService.getNextId())
          this.formBad=true
          return;
        }
        console.log("Form Submitted!");
        console.log(this.form.value);
        let trip:Trip= {
          id:this.TripsService.getNextId(),
          name: this.form.get('name')!.value,
          destination: this.form.get('destination')!.value,
          startingDate: this.form.get('startingDate')!.value,
          endingDate: this.form.get('endingDate')!.value,
          price: this.form.get('price')!.value,
          quantity: this.form.get('quantity')!.value,
          description: this.form.get('description')!.value,
          img1: this.form.get('img')!.value,
          img2: this.form.get('img')!.value,
          img3: this.form.get('img')!.value,
          reserved: 0,
          numberOfRates:0,
          min:0,
          rating:0

        }

        this.formGood=true;
        // this.emiter.emit(trip);
        this.TripsService.addTrip(trip);
        this.form.reset();

        }


      }




