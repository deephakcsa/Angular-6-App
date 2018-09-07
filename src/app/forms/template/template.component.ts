import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  user : any = {};

  constructor() { }

  ngOnInit() {
  }

  saveUser(data, valid) : void {
    if(valid) {
      console.log(data);
    }
  }

}
