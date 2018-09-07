import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers:[ProductsService]
})
export class DetailComponent implements OnInit {

  details : any = {};


  constructor(private _activatedRoute : ActivatedRoute, private _router : Router, private _productService : ProductsService) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((data) => {
      console.log(data.pId);
    //this.details = (this._productService.get_product(data));

    this._productService.get_product(data).subscribe((resp)=>{
      console.log(resp['docs']);
      var obj = (resp['docs']);
      this.details = obj[0];
    });
    });
    // if(!this.details){
    //   this._router.navigate(['/home']);
    // }
  }

  back(){
    this._router.navigate(['/products']);
  }


}
