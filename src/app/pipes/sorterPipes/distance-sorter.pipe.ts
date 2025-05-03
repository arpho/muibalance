import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceSorter',
  standalone: true
})
export class DistanceSorterPipe implements PipeTransform {

  transform<T>(value: T[], ...args: any[]): T[]  {
    return args[0]?  value.sort((a: any, b: any) => args[0](a,b)):value
  }

}
