import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  userForm : FormGroup;

  constructor(private _fb : FormBuilder) { }

  ngOnInit() {
    this.userForm = this._fb.group({
      firstname : ['', [Validators.required, Validators.minLength(5)]],
      lastname : ['', [Validators.required, Validators.minLength(5)]],
      email :  ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone:'',
      gender : 'Male',
      notification:'Email',
      details : ''
    });
  }

  populateForm() {
    this.userForm.setValue({
      firstname : 'User firstname',
      lastname : 'User lastname',
      email : 'user@gmail.com',
      phone:'Phone number',
      gender : 'Male',
      notification:'Email'
    });
  }

  saveUser() {
    console.log(this.userForm.value);
  }

  updateNotification(val:string) {
    let phoneControl = this.userForm.get('phone');
    if(val=='text') {
      phoneControl.setValidators([Validators.required, Validators.minLength(5)]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  updateValidation(flag:string){
    var detailsControl=this.userForm.get('details');
    if(flag=='female'){
      detailsControl.setValidators([Validators.required, Validators.minLength(5)]);
    }else{
      detailsControl.clearValidators();
    }
    detailsControl.updateValueAndValidity();
  }


}
