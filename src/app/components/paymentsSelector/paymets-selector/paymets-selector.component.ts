import { Component, EventEmitter, model, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { PaymentsService } from '../../../services/payments/payments.service';
import { PaymentModel } from '../../../models/paymentModel';
import { UsersService } from '../../../services/users/users.service';
import {  MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { FilterPipe } from "../../../pipes/filterPipe/filter-pipe.pipe";

@Component({
  selector: 'app-paymets-selector',
  imports: [
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FilterPipe
],
  templateUrl: './paymets-selector.component.html',
  styleUrl: './paymets-selector.component.css',
  standalone: true
})
export class PaymentsSelectorComponent implements OnChanges,OnInit,OnDestroy {
onKey(arg0: any) {
console.log("filtering",arg0.target.value)
this.searchPayment = (arg:PaymentModel)=>{
  console.log("arg",arg)
  return arg.nome.toLowerCase().includes(arg0.target.value.toLowerCase())}



}
paymentsKey = model('')
$payments = signal<PaymentModel[]>([])
subscriptions = new Subscription()
  paymentsKeyChanged: EventEmitter<string> = new EventEmitter<string>();
  searchForm: FormGroup = new FormGroup({});
searchPayment =(arg:any)=> true
  constructor(
    private service: PaymentsService,
    private users:UsersService,
    private fb:FormBuilder
  ) { }
  ngOnDestroy(): void {
   this.subscriptions.unsubscribe()
  }
  async ngOnInit() {
    const loggedUser = await this.users.getLoggedUser();
 const payments = await this.service.getPayments(loggedUser.key)
console.log("payments",payments)
this.$payments.set(payments)
this.searchForm = this.fb.group({
  search: new FormControl('')

})
this.searchForm.get("search")?.valueChanges.subscribe((value:string)=>{
  console.log("value",value, this.searchPayment)

  payments.filter((payment:PaymentModel)=>payment.title.toLowerCase().includes(value.toLowerCase()))
})
this.paymentsKey.subscribe((value)=>{
  console.log("value",value)
  this.paymentsKey.set(value)
  this.paymentsKeyChanged.emit(value)

})


  }
  ngOnChanges(changes: SimpleChanges): void {
 console.log("changes on payment viewer",changes)
  }
}
