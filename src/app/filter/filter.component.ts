import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Trip } from '../shared/ITrip';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{


  @Input()
  loadedCountries:string[]=[];
  @Input()
  loadedRating:number[]=[];
  @Input()
  loadedpricel:number=0;
  @Input()
  loadedpriceh:number=0;
  @Input()
  allCountries:string[]=[];
  @Input()
  allRatings:number[]=[];

  form:FormGroup;
  filteredCountries:string[]=this.loadedCountries;
  // allCountries:string[]=this.loadedCountries;
  filteredRating:number[]=this.loadedRating;


  filteredLowPrice = 0;
  filteredUpPrice = 0;
  filteredStartDate = new Date(0);
  filteredEndDate = new Date(0);


  @Output()
  emiter = new EventEmitter<any[]>();


  toEmit:any[5]=[this.allCountries,this.allRatings,this.loadedpricel,this.loadedpriceh];

  constructor(){
    this.form = new FormGroup({

      priceLow:new FormControl(),
      priceHigh:new FormControl(),
      dateLow:new FormControl(),
      dateHigh:new FormControl()

    })

  }
  ngOnInit(): void {

    this.filteredCountries=this.loadedCountries;
    this.filteredRating=this.loadedRating;
    // this.toEmit=[this.allCountries,this.allRatings,this.loadedpricel,this.loadedpriceh];



  }
  setEmit(){
    this.toEmit=[this.allCountries,this.allRatings,this.loadedpricel,this.loadedpriceh];
  }
  addCountry(e:any,country:string){
    if(e.target.checked){
      this.filteredCountries.push(country);
      this.toEmit[0]=this.filteredCountries;
    }
    else{
      this.filteredCountries.forEach( (item, index) => {
        if(item === country) this.filteredCountries.splice(index,1);
      });
      this.toEmit[0]=this.filteredCountries;
      console.log(this.toEmit)
    }
    this.emitFilter();
  }

  addRating(e:any,rate:number){
    if(e.target.checked){
      this.filteredRating.push(rate);
      this.toEmit[1]=this.filteredRating;
    }
    else{
      this.filteredRating.forEach( (item, index) => {
        if(item == rate) this.filteredRating.splice(index,1);
      });
      this.toEmit[1]=this.filteredRating;
      console.log(this.toEmit)

    }
    this.emitFilter();
  }

  filterLowPrice(event:any){

    const inputValue = event.target.value;
    console.log(inputValue)
    this.filteredLowPrice=inputValue;
    this.toEmit[2]=this.filteredLowPrice;

    console.log
    this.emitFilter();

  }

  filterUpPrice(event:any){

    const inputValue = event.target.value;
    this.filteredUpPrice=inputValue;

    this.toEmit[3]=this.filteredUpPrice;
    console.log
    this.emitFilter();

  }

  filterLowDate(event:any){

    const inputValue = event.target.value;
    console.log(inputValue)
    this.filteredStartDate=inputValue;
    this.toEmit[4]=this.filteredStartDate;

    console.log
    this.emitFilter();

  }

  filterUpDate(event:any){

    const inputValue = event.target.value;
    this.filteredEndDate=inputValue;

    this.toEmit[5]=this.filteredEndDate;
    console.log
    this.emitFilter();

  }

  emitFilter(){
      this.emiter.emit(this.toEmit)
      console.log(this.toEmit);

    }

  }




