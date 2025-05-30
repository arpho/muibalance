import { Component, EventEmitter, inject, model, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { PaymentsService } from '../../../services/payments/payments.service';
import { PaymentModel } from '../../../models/paymentModel';
import { UsersService } from '../../../services/users/users.service';
import {  MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { FilterPipe } from "../../../pipes/filterPipe/filter-pipe.pipe";
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { PaymentsDialogComponent } from '../../paymentsDialog/paymentsDialog.component';


@Component({
  selector: 'app-paymets-selector',
  imports: [
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FilterPipe,
    MatButtonModule,

],
  templateUrl: './paymets-selector.component.html',
  styleUrl: './paymets-selector.component.css',
  standalone: true
})
export class PaymentsSelectorComponent implements OnChanges,OnInit,OnDestroy {
selectedPayment($event: MatSelectChange) {
console.log("selectedPayment from payment selector", $event)
}
change($event: any) {
console.log("change", $event)
}
  constructor(
    private service: PaymentsService,
    private users:UsersService,
    private fb:FormBuilder,
    private _dialog:MatDialog
  ) { }


createPayment() {
console.log("createPayment")
this._dialog.open(PaymentsDialogComponent,{
  data:{data:new PaymentModel(),buttonText:"Create"}
}).afterClosed().subscribe(async (payment:PaymentModel)=>{
const loggedUser = await this.users.getLoggedUser()
  console.log("closed payment dialog",payment)
  payment.userKey = loggedUser.key
  this.service.createPayment(payment).then(resPayment=>{
    console.log("created",resPayment)
  this.paymentsKey.set(resPayment.key)
    this.paymentsKeyChanged.emit(resPayment.key)
  })

})

}
onKey(arg0: any) {
console.log("filtering",arg0.target.value)
this.searchPayment = (arg:PaymentModel)=>{
  return arg.nome.toLowerCase().includes(arg0.target.value.toLowerCase())}
}
paymentsKey = model('')
$payments = signal<PaymentModel[]>([])
subscriptions = new Subscription()
  paymentsKeyChanged: EventEmitter<string> = new EventEmitter<string>();
  searchForm: FormGroup = new FormGroup({
    searchPayment: new FormControl(''),
    paymentsKey: new FormControl('')
  });

searchPayment =(arg:any)=> true
  ngOnDestroy(): void {
   this.subscriptions.unsubscribe()
  }
  async ngOnInit() {
    const loggedUser = await this.users.getLoggedUser();
 const payments = await this.service.getPayments(loggedUser.key)
this.$payments.set(payments)
this.searchForm = this.fb.group({
  search: new FormControl(''),
  paymentsKey: new FormControl('')

})

this.searchForm.get("search")?.valueChanges.subscribe((value:string)=>{
    payments.filter((payment:PaymentModel)=>payment.title.toLowerCase().includes(value.toLowerCase()))
})
this.paymentsKey.subscribe((value)=>{
  this.paymentsKey.set(value)
  this.paymentsKeyChanged.emit(value)

})


  }
  ngOnChanges(changes: SimpleChanges): void {
 console.log("changes on payment viewer",changes)
 this.searchForm.valueChanges.subscribe((value)=>{
   console.log("value on form",value)
 })
  }
}
