import { Component, inject, model,  OnInit, signal, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SellerModel } from '../../../models/supplierModel';
import { MatInputModule } from '@angular/material/input';
import { SellersService } from '../../../services/suppliers/suppliers.service';
import { UsersService } from '../../../services/users/users.service';
import { MatDividerModule } from '@angular/material/divider';
import { GelocationService } from '../../../services/geolocation/gelocation.service';
import { DataFormComponent } from '../../forms/sellers/generalData/data-form/data-form.component';
import { AddressFormComponent } from '../../forms/sellers/address/address-form/address-form.component';

@Component({
  selector: 'app-seller-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    DataFormComponent,
    AddressFormComponent
  ],
  templateUrl: './seller-dialog.component.html',
  styleUrl: './seller-dialog.component.css',
  standalone: true
})
export class SellerDialogComponent implements OnInit  {
  @ViewChild(DataFormComponent, { static: true })dataSection!: DataFormComponent;
  @ViewChild(AddressFormComponent, { static: true })addressSection!: AddressFormComponent;
updateSeller() {
this.dialogRef.close(this.seller() )
}
geolocalize() {
console.log("geolocalize")
console.log("form",this.addressForm.value)
this.addressForm.patchValue({
address: "ciccio",
latitude: 10,
longitude: 10
})
this.geolocation.getCurrentPosition().subscribe({
next:(position)=>{
console.log("got position",position);
},
error:(error)=>{ console.error("error getting positionerror getting position",error)

}
})
}
onkey($event: KeyboardEvent) {
console.log("filter for",($event.target as HTMLInputElement).value)
this.sellers.set(this.sellers().filter(seller=>seller.nome.toLowerCase().includes(($event.target as HTMLInputElement).value.toLowerCase())))
}
  sellers = signal<SellerModel[]>([])
  address:{
    address:string,
    latitude:number,
    longitude:number
  }={
    address:"",
    latitude:0,
    longitude:0
  }
  constructor(
    private sellers_Service:SellersService,
    private users:UsersService,
    private geolocation:GelocationService,
    private fb:FormBuilder
  ) { }
makeWindowTitle() {
return `editing ${this.seller().nome}`
}
  async ngOnInit() {
 console.log("seller",this.seller())
 this.address = this.seller().address
 const loggedUser = await this.users.getLoggedUser();
 const sellers = await this.sellers_Service.getSuppliers4User(loggedUser.key)
 console.log("got sellers",sellers)
 this.sellers.set(sellers)
console.log("address",this.seller().address.address)
this.address = this.seller().address
const dataForm = this.dataSection.initializeForm()
const addressForm = this.addressSection.initializeForm()
this.sellerForm = this.fb.group({
  data:dataForm,
  address:addressForm
})
  }

  readonly dialogRef = inject(MatDialogRef<SellerDialogComponent>)
  readonly data= inject<{data:SellerModel,buttonText:string}>(MAT_DIALOG_DATA);
  readonly seller = model<SellerModel>(this.data.data)
  readonly buttonText = model(this.data.buttonText)
addressForm:FormGroup = new FormGroup({
  address: new  FormControl(this.seller().address.address),
  latitude: new  FormControl(this.seller().address.latitude),
  longitude: new  FormControl(this.seller().address.longitude)
})

  sellerForm:FormGroup = new FormGroup({
    nome: new  FormControl(this.seller().nome),
    note:new FormControl(this.seller().note),
    rootSellerKey: new FormControl(this.seller().rootSellerKey),
    address: this.addressForm
  })
}

