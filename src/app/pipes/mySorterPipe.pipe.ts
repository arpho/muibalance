import { Pipe, type PipeTransform } from '@angular/core';
import { ShoppingCartModel } from '../models/shoppingCartModel';

@Pipe({
  name: 'appSorterPipe',
  standalone: true
})
export class MySorterPipePipe implements PipeTransform {

  transform(value: ShoppingCartModel[], sorterFunction?: (a: any, b: any) => number): ShoppingCartModel[] {
    return   value.sort((a: any, b: any) => {
return new Date(b.buyngDate).getTime() - new Date(a.buyngDate).getTime()
    });
  }

}
