import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerModel } from '../../../../../models/supplierModel';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { GelocationService } from '../../../../../services/geolocation/gelocation.service';

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
        MatButtonModule
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
  standalone: true
})
export class AddressFormComponent {
async geolocalize() {
console.log("geolocalize")
this.geolocation.getCurrentPosition().subscribe({
next:(position)=>{
console.log("got position",position)
},
error:(error)=>{ console.error("error getting positionerror getting position",error)

}
})

}
  addressForm:FormGroup = new FormGroup({});
  @Input({required:true})seller = new SellerModel()

  constructor(
    private fb:FormBuilder,
    private geolocation:GelocationService
  ) {
    this.addressForm = this.fb.group({
      address: this.seller.address.address,
      latitude: this.seller.address.latitude,
      longitude: this.seller.address.longitude
    })
  }
  initializeForm(){
    console.log("initialize address Form ",this.seller)
    this.addressForm = this.fb.group({
      address: this.seller.address.address,
      latitude: this.seller.address.latitude,
      longitude: this.seller.address.longitude
    })

    return this.addressForm
  }
}
