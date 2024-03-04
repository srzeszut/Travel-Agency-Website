import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private afAuth:AngularFireAuth,private AS:AuthService){}

  handleRegister(value:any){
    this.AS.signUp(value.email,value.password,value.name);
    document.querySelectorAll('input') .forEach(el => {
      el.value = '';
    });

  }

}
