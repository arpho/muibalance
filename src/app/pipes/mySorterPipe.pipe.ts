import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appSorterPipe',
  standalone: true
})
export class MySorterPipePipe implements PipeTransform {

  transform(value: any,sorterFunction?: any): unknown {
    return sorterFunction ?  value.sort((a: any, b: any) => sorterFunction(a, b)): value;
  }

}
