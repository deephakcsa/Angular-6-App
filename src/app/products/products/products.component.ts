import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[ProductsService]
})
export class ProductsComponent implements OnInit, OnDestroy {

  pageTitle: string = 'Products - LIST';
  products: any = [];
  productsubscription :any;

  boolImg : boolean = true;

  constructor(private _productService : ProductsService) { }

  ngOnInit() {
    this.productsubscription = this._productService.getProducts().subscribe((resp)=>{
      this.products = resp['docs'];
    });
  }

  ngOnDestroy(){
    this.productsubscription.unsubscribe();
  }

  toggleImg() : void {
    if(this.boolImg){
      this.boolImg = false;
    }
    else{
      this.boolImg = true;
    }
  }

  ratingParentFn(ratingVal:String){
    console.log(ratingVal);
  }

}
