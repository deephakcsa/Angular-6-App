import { Pipe, PipeTransform } from '@angular/core';
import { TreeError } from '../../../node_modules/@angular/compiler';

@Pipe({
  name: 'products'
})
export class ProductsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return args ? value.filter((item,index) =>{
      if(item.productName.toLowerCase().indexOf(args.toLowerCase())!=-1){
        return true;
      }
    }) : value;
  }
}
