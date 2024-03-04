import { TripBought } from './../shared/IBuyTrip';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { User } from '../shared/IUser';
import { Observable } from 'rxjs';
import { Trip } from '../shared/ITrip';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  persistence:any;
  users:Observable<any[]>;
  userData:any;
  currentUID:any
  currentRole='guest'
  currentName:any
  currentCart:any;
  currentBan:any;
  userRef = this.db.list('users');
  persistenceRef=this.db.object('persistence')
  isLoggedIn!:boolean;

  constructor(private afAuth: AngularFireAuth, private router:Router,private db:AngularFireDatabase) {
    this.persistenceRef.valueChanges().subscribe((pers:any)=>{
      this.persistence=pers.per1;
      console.log(this.persistence);
    });

    this.users=this.userRef.valueChanges();
    this.userData=this.afAuth.authState;
    this.checkLogged();


    this.userData.subscribe((user:any)=>{
      this.currentUID=user?.uid;
      this.users.subscribe((users)=>{
        for(let user of users){
          if(user.uid==this.currentUID){
            this.currentRole= user.role;
            this.currentCart=user.cart;
            this.currentName=user.name;
            this.currentBan=user.banned;
          }
        }
      })




      })

  }
  checkLogged(){
    this.userData.subscribe((user:any)=>{
      if(user!=null){
        this.isLoggedIn=true;

      }
      else{
        this.isLoggedIn=false;

      }})

    // console.log(this.isLoggedIn)

    }

  signIn(email:string,password:string){
    return this.afAuth.setPersistence(this.persistence).then(() =>{
      this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user?.email);
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
    });
  }

  signOut() {

    this.afAuth.setPersistence(this.persistence).then(() =>{
      this.afAuth
      .signOut();
      this.router.navigate(['/home']);
    });

    this.currentName=null;
    this.currentRole='guest';
    this.currentUID=null;

  }

  signUp(email:string,password:string,name:string){
    return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log("here")

      this.userRef.set(result.user?.uid + '',{
        uid: result.user?.uid,
        name: name,
        email: result.user?.email,
        role: 'customer',
        banned: false,
        trips: [],
        cart:[],
      } as User);
      this.router.navigate(['/home']);
      window.alert('You have been successfully registered!');
    })
    .catch((error) => {
      window.alert(error.message);
    });
  }

  setPersistence(persistence:string){
    this.persistence=persistence;
    this.persistenceRef.update({per1:persistence})
  }
  setRole(uid : string, role : string) {
    this.userRef.update(uid,{role: role});
  }
  getUsers(){
    return this.users;
  }
  getPersistence(){
    return this.persistence;
  }
  banUser(uid:string){
    this.userRef.update(uid,{banned: true});

  }
  unBanUser(uid:string){
    this.userRef.update(uid,{banned: false});

  }
  getCurrentUser() : Observable <any> {

    return this.userData;
  }

  getRoleforUser(uid: string) {
    return this.userData.subscribe((user:any)=>{
      this.currentUID=user?.uid;
      this.users.subscribe((users)=>{
        for(let user of users){
          if(user.uid==uid){
            console.log(user.role)
            return user.role;

          }
        }
      })
      })
  }
  setCart(uid:string,cart:Trip[]){
    this.userRef.update(uid,{cart: cart});
  }
  getCart(){
    return this.currentCart;
  }
  buy(uid:string,trip:Trip){

  }


}
