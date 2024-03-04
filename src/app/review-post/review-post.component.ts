import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Post } from '../shared/IPost';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  styleUrls: ['./review-post.component.css']
})
export class ReviewPostComponent implements OnInit {
  stars: number[]=[1,2,3,4,5]
  selectedValue:number=0;

  @Output() emiter = new EventEmitter<Post>();

  form: FormGroup;


  constructor(private formBuilder : FormBuilder,protected AS: AuthService) {
    this.form = this.formBuilder.group({
      trip: ['', [Validators.required, Validators.pattern('^[ ]*?(([A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+)?([ ]+)?)+$')]],
      date: [''],
      opis:['']
    });

  }
  ngOnInit(): void {

  }


  onSubmit(){
    if(!this.AS.currentBan){
    let post:Post= {
      nick: this.AS.currentName,
      trip: this.form.get('trip')!.value,
      date:this.form.get('date')!.value,
      text:this.form.get('opis')!.value,
      rate:this.selectedValue

    }

    console.log(post)
    this.emiter.emit(post);
  }
  this.selectedValue=0

  }

  countStar(star: number) {
    this.selectedValue = star;


  }}


