import { Pipe, PipeTransform } from '@angular/core';
import { GelocationService } from '../../services/geolocation/gelocation.service';

@Pipe({
  name: 'distanceSorter',
  standalone: true
})
export class DistanceSorterPipe implements PipeTransform {

  transform<T>(value: T[], ...args: any[]): T[]  {
    return args[0]?  value.sort((a: any, b: any) =>{
      return  GelocationService.distance(Number(b.address.latitude), Number(b.address.longitude),Number( args[0].latitude),Number( args[0].longitude)) -
      GelocationService.distance(Number(a.address.latitude),Number( a.address.longitude), Number(args[0].latitude), Number(args[0].longitude))
    }):value
  }

}
