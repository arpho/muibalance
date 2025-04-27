import { Component, Inject, Input, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerModel } from '../../../../../models/supplierModel';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { GelocationService } from '../../../../../services/geolocation/gelocation.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.prod';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { BottomListComponent } from '../../../../bottomSheet/bottom-list/bottom-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-form',
  imports: [
     ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatButtonModule,
         MatBottomSheetModule,
         BottomListComponent
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
  standalone: true
})
export class AddressFormComponent implements OnDestroy{
  subscriptions = new Subscription();
  indirizzi = signal<string[]>([])
async geolocalize() {
console.log("geolocalize")
const address =   await this.geolocation.reverseGeocode(this.seller.address.latitude,this.seller.address.longitude)
console.log("address prima ",address)
this.geolocation.getCurrentPosition().subscribe({
next:async (position)=>{
console.log("got position",position)
this.seller.address.latitude = position.coords.latitude
this.seller.address.longitude = position.coords.longitude
const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${environment.GOOGLEapikEY}`
const res = await this.geolocation.reverseGeocode(this.seller.address.latitude,this.seller.address.longitude)
console.log("address",res)

let indirizzi = []
if (res)
 indirizzi =  res['results'].map((r:any)=>r.formatted_address)
console.log(indirizzi)
this.indirizzi.set(indirizzi)
const bottomSheetRef = this.bottomSheet.open(BottomListComponent, {
  data: indirizzi,
})
this.subscriptions.add(
bottomSheetRef.afterDismissed().subscribe((result) => {
  console.log('The bottom sheet was dismissed with result:', result);
  this.seller.address.address = result
})
)
},
error:(error)=>{ console.error("error getting position",error)

}
})

}
  addressForm:FormGroup = new FormGroup({});
  @Input({required:true})seller = new SellerModel()

  constructor(
    private fb:FormBuilder,
    private geolocation:GelocationService,
    private http:HttpClient,
    private bottomSheet:MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: string[]
  ) {
    this.addressForm = this.fb.group({
      address: this.seller.address.address,
      latitude: this.seller.address.latitude,
      longitude: this.seller.address.longitude
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  initializeForm(){

    this.addressForm = this.fb.group({
      address: this.seller.address.address,
      latitude: this.seller.address.latitude,
      longitude: this.seller.address.longitude
    })

    return this.addressForm
  }
}
