import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from './ITrip';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(trips: Trip[], location:string[], lowPrice:number,upPrice:number,startDate:Date,endDate:Date,rating:number[]): Trip[] {
    if (!trips)
    return [];
    let result:Trip[]=[];

    if(location.length>0){
      for( let l of location){
        l=l.toLowerCase();
        const toAdd =trips.filter((trip)=>{
          return trip.destination.toLowerCase()===l;
        })
        for( let trip of toAdd){
          if(!result.includes(trip))
          result.push(trip);}


      }
    }
    let temp:Trip[]=[];
    if(rating.length>0){
      for(let r of rating){
        const toAdd =result.filter(trip =>{
          return trip.rating==r;
        })
        for(let trip of toAdd){
          temp.push(trip);
      }
      }
      result=temp
    }




    if(lowPrice>-1){
      result=result.filter(trip =>{

          return trip.price>=lowPrice;

      })

    }


    if(upPrice){
      result=result.filter(trip =>{
        return trip.price<=upPrice;
      })

    }


    if(startDate>new Date(0)){
      result=result.filter(trip =>{
        return trip.startingDate>=startDate;
      })

    }

    if(endDate>new Date(0)){
      result=result.filter(trip =>{
        return trip.endingDate<=endDate;
      })

    }



    return result;
  }

}
