import { Component, Input } from '@angular/core';
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
        MatIconModule
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
  standalone: true
})
export class AddressFormComponent {
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
    private http:HttpClient
  ) {
    this.addressForm = this.fb.group({
      address: this.seller.address.address,
      latitude: this.seller.address.latitude,
      longitude: this.seller.address.longitude
    })
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
