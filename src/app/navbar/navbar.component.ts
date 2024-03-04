import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  hamburgerClicked=false;
  constructor(protected AS:AuthService){}

  signOut(){
    this.AS.signOut();

  }
  hambClick(){
    if(this.hamburgerClicked==false){
      this.hamburgerClicked=true
    }else{
      this.hamburgerClicked=false;
    }

  }

}
