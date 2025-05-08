import { ChangeDetectionStrategy, Component, computed, Input, OnInit, signal } from '@angular/core';
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
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
    SellerSelectorComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule
  ],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}, ],
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.css',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartFormComponent implements OnInit{
  public note= signal("")
  title= signal("")
  totale = signal(0)
  online = signal(false)
  delivered = signal(false)
  buyngDate = signal("")
  sellerKey = signal("")
  deliveredDate = signal("")
  ngOnInit(): void {
    this.title.set(this.cart.title)
    this.note.set(this.cart.note)
    this.totale.set(this.cart.totale)
    this.online.set(this.cart.online)
    this.delivered.set(this.cart.delivered)
    this.buyngDate.set(this.cart.buyngDate)
    this.sellerKey.set(this.cart.sellerKey)
    this.deliveredDate.set(this.cart.deliveredDate)

  }

  public formValue = computed (() =>{
    return {
      note: this.note(),
      title: this.title(),
      totale: this.totale(),
      online: this.online(),
      delivered: this.delivered(),
      buyngDate: this.buyngDate(),
      key: this.cart.key,
      deliveredDate: this.deliveredDate(),
      sellerKey: this.sellerKey(),
    }
  })

  public formValid = computed (() => {
    const {note,title, sellerKey}= this.formValue()
    return  sellerKey

  })
onYesClick() {
console.log("yes",this.formValue())
}
onNoClick() {
console.log("cancel")
}
selectedSeller(sellerKey: any) {
console.log("selectedSeller",sellerKey)
this.sellerKey.set(sellerKey)
this.cart = new ShoppingCartModel({
  ...this.cart,
  sellerKey
})
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


}
