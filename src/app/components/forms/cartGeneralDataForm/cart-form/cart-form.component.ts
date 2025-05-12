import { ChangeDetectionStrategy, Component, computed, input, Input, OnInit, output, signal } from '@angular/core';
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
import { PaymentFraction } from '../../../../models/paymentsFraction';
import { PaymentsTableComponent } from '../../../paymentsTable/payments-table/payments-table.component';

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
    MatButtonModule,
    PaymentsTableComponent
  ],
  providers: [ {provide: DateAdapter, useClass: NativeDateAdapter}, {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}, ],
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.css',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartFormComponent implements OnInit{
paymentsListChanged($event: PaymentFraction[]) {
console.log("paymentsListChanged", $event)
this.payments.set($event)
}

sellerKeyChange($event: any) {
throw new Error('Method not implemented.');
}
  public note= signal("")
  title= signal("")
  totale = signal(0)
  online = signal(false)
  buttonText = input()
  delivered = signal(false)
  updatedCart= output<{ note: string; title: string; totale: number; online: boolean; delivered: boolean; buyngDate: string; key: string; deliveredDate: string; sellerKey: string; }|null>( )
  buyngDate = signal(new Date().toISOString())
  sellerKey = signal("")
  deliveredDate = signal("")
  payments = signal<PaymentFraction[]>([])
  ngOnInit(): void {
    this.title.set(this.cart.title)
    this.note.set(this.cart.note)
    this.totale.set(this.cart.totale)
    this.online.set(this.cart.online)
    this.delivered.set(this.cart.delivered)
    this.buyngDate.set(this.cart.buyngDate)
    this.sellerKey.set(this.cart.sellerKey)
    this.deliveredDate.set(this.cart.deliveredDate)
    this.payments.set(this.cart.payments)

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
      payments: this.payments()
    }
  })

  public formValid = computed (() => {
    const {note,title, sellerKey,payments}= this.formValue()

    return  sellerKey

  })
onYesClick() {
console.log("yes",this.formValue())
this.updatedCart.emit(this.formValue())
}
onNoClick() {
this.updatedCart.emit(null)
}
selectedSeller(sellerKey: any) {
console.log("selectedSeller",sellerKey)
this.sellerKey.set(sellerKey)
this.cart = new ShoppingCartModel({
  ...this.cart,
  sellerKey
})
//this.updatedCart.emit(this.formValue())
}

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
      id:"",// dummy key for the slide toggles
      buyngDate:this.cart.buyngDate,
      deliveredDate:this.cart.deliveredDate
    })
  }


}
