import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/IUser';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent{
  persistence!: any;
  users!:User[]

  constructor(protected AS:AuthService){

    this.AS.getUsers().subscribe(change => {
      this.users = [];
      for(let user of change) {
        this.users.push(user);
      }


  })
}

  setPersistence(persistence:string){
    this.AS.setPersistence(persistence);
    this.persistence=persistence;
  }
  setRole(uid:string,role:string){
    this.AS.setRole(uid,role);

  }
  banUser(uid:string){
    for(let user of this.users){
        if(user.uid==uid){
          if(user.banned==true){
            this.AS.unBanUser(uid);
          }
          else{
            this.AS.banUser(uid);

          }

        }
    }

  }

}
