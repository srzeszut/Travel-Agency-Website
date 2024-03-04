import { Component, EventEmitter, Output ,Input} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

    stars: number[]=[1,2,3,4,5]
    @Input() selectedValue: number = 0;
    @Input() show= false;
    @Output()
    emiter = new EventEmitter<number>();

    countStar(star: number) {
      if(this.show){
      this.selectedValue = star;
      this.emiter.emit(star);
    }}


}
