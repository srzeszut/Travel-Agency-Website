import { CartService } from './services/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CartService]
})
export class AppComponent {
  title = 'wycieczki';
}
