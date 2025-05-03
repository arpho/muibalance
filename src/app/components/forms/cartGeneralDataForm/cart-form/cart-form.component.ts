import { Component, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartModel } from '../../../../models/shoppingCartModel';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { SellersService } from '../../../../services/suppliers/suppliers.service';
import { SellerModel } from '../../../../models/supplierModel';
import { UsersService } from '../../../../services/users/users.service';
import { MatSelectModule } from '@angular/material/select';
import { FilterPipe } from '../../../../pipes/filterPipe/filter-pipe.pipe';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SellerViewerComponent } from '../../../sellerViewer/sellerViewer.component';
import { SellerSelectorComponent } from '../../../sellerSelector/seller-selector/seller-selector.component';

@Component({
  selector: 'app-cart-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    FilterPipe,
    MatIconModule,
    SellerSelectorComponent
  ],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}, ],
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.css',
  standalone: true
})
export class CartFormComponent implements OnInit{
selectedSeller($event: Event) {
console.log("selectedSeller",$event)
}
  searchSeller: string="";
onKey(arg0: any) {
console.log(arg0)
}
  @Input({required: true}) cart: ShoppingCartModel = new ShoppingCartModel()
  filterSeller= (seller:SellerModel)=>true
  form:FormGroup = new FormGroup({})
  sellers= signal<SellerModel[]>([])
  constructor(
    private fb : FormBuilder,
    private sellersService:SellersService,
    private users:UsersService
  )
  {
    this.form = this.fb.group({
      note: this.cart.note,
      title: this.cart.title,
      totale: this.cart.totale,
      online: this.cart.online,
      delivered: this.cart.delivered,
      sellerKey: this.cart.sellerKey,
      searchSeller: this.searchSeller,
      id:"",// dummy key for the slide toggles
      buyngDate:this.cart.buyngDate,
      deliveredDate:this.cart.deliveredDate
    })
  }
  async ngOnInit() {
    const loggedUser = await this.users.getLoggedUser()


    this.form.get("searchSeller")?.valueChanges.subscribe((value:string)=>{

      console.log("value",value)
      this.filterSeller = (seller:SellerModel)=>seller.nome.toLowerCase().includes(value.toLowerCase())
    })
  }

}
