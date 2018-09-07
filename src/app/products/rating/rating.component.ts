import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating : number;
  @Output() ratingEvent : EventEmitter<string> = new EventEmitter();
  ratingArr : any = [];

  constructor() { }

  ngOnInit() {
    console.log(this.rating);
    this.ratingArr = Array(Math.round(this.rating)).fill(Math.round(this.rating));
  }

  ratingEventFn() {
    this.ratingEvent.emit('Rating Value = '+ this.rating);
  }

}
