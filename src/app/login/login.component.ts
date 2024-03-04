import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private AS:AuthService){}

  handleLogin(value:any){
    this.AS.signIn(value.email,value.password);
    document.querySelectorAll('input') .forEach(el => {
      el.value = '';
    });

  }

}
