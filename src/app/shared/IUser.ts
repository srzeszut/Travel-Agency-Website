import { TripBought } from "./IBuyTrip";
import { Trip } from "./ITrip";
export interface User{
  uid:string;
  name:string;
  email:string;
  role:string;
  banned:boolean;
  trips:Array<TripBought>;
  cart:Array<Trip>;

}
