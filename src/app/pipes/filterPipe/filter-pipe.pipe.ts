import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform<T>(value: T[], ...args: any[]): T[] {
    console.log("args",args)
    return args[0]?  value.filter(item=>args[0](item)):value
  }


}
