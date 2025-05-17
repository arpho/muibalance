import { Component, computed, EventEmitter, model, OnInit, output, signal } from '@angular/core';
import { PaymentFraction } from '../../../models/paymentsFraction';
import {  MatTableModule } from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { PaymentViewerComponent } from "../../payment-viewer/payment-viewer.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import { PaymentsSelectorComponent } from "../../paymentsSelector/paymets-selector/paymets-selector.component";
import { MatIconModule } from '@angular/material/icon';
import { PaymentFractionExpansionPanelComponent } from '../../paymentFraction/payment-fraction-expansion-panel/payment-fraction-expansion-panel.component';

@Component({
  selector: 'app-payments-table',
  imports: [
    MatTableModule,
    PaymentViewerComponent,
    PaymentViewerComponent,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatLabel,
    MatDatepickerModule,
    PaymentsSelectorComponent,
    MatMenuModule,
    MatIconModule,
    PaymentFractionExpansionPanelComponent
],
  templateUrl: './payments-table.component.html',
  styleUrl: './payments-table.component.css',
  standalone: true
})
export class PaymentsTableComponent  implements OnInit{
deletePayment($event: any) {
console.log("deletePayment from payment selector", $event,this.selectedIndex())
this.payments().splice(this.selectedIndex()??0,1)
const payments = this.payments()
console.log("payments",payments);
this.payments.set([...payments])
console.log("deletePayment",this.payments())
}

  selectedFraction = signal<PaymentFraction|null>(null)
  selectedIndex = signal<number|null>(null)
selectPayment(_t74: any,index:number) {
  console.log("selectPayment from payment selector", _t74,index)
  this.selectedFraction.set(new PaymentFraction(_t74))
  console.log("selectPayment",this.selectedFraction())
  this.selectedIndex.set(index)

}
updatePayment(event: any) {
console.log("updatePayment from payment selector", event)
this.fractionPayment.set({payment:this.selectedFraction()!,operation:"update",index:this.selectedIndex()??0})
}
updatedPayment($event: { payment: PaymentFraction; operation?: string; index?: number; }) {
console.log("updatedPayment from payment selector", $event)

if($event.operation=="add"){
  const newPayment = new PaymentFraction($event.payment)

  this.payments.set([...this.payments(), newPayment])
  console.log("added",newPayment)

}
if($event.operation=="update"){
  this.payments().splice($event.index??0,1,$event.payment)
  const payments = this.payments()
  this.payments.set([...payments])
  console.log("updated",this.payments())
}
this.paymentsListChanged.emit(this.payments())
}
submit() {
throw new Error('Method not implemented.');
}
insertNewPayment() {
  const newPayment = new PaymentFraction()
console.log("insertNewPayment from payment selector",newPayment)
this.fractionPayment.set({payment:newPayment,operation:"add"})

}
fractionPayment= signal<{payment:PaymentFraction,operation:string,index?:number}|null>(null)
insertPayment() {
console.log("insertPayment from payment selector",this.newFractionValue())
this.panelOpenState.set(false)
}
selectedPayment($event: Event) {
console.log("selectedPayment from payment selector", $event)
}
addPayment() {
console.log("addPayment", this.newFractionValue())
//this.payments.set([...this.payments(), new PaymentFraction(   this.newFractionValue())])
const newPayment = new PaymentFraction()
this.fractionPayment.set({payment:newPayment,operation:"add"})
this.payments().push(newPayment)
this.paymentsListChanged.emit(this.payments())
this.panelOpenState.set(false)
}
  newFraction:FormGroup = new FormGroup({})
  constructor(
    private fb:FormBuilder
  ) {}

  amount= signal(0)
  paymentsListChanged = output<PaymentFraction[]>()
  paymentsDate= signal(new Date().toISOString())
  paymentNote= signal("")
  paymentsKey= signal("")
  readonly panelOpenState = signal(false)
  ngOnInit(): void {
 console.log("payments",this.payments())
 this.newFraction = this.fb.group({
  amount: this.amount(),
  paymentsDate: this.paymentsDate(),
  note: this.paymentNote(),
  paymentsKey: this.paymentsKey()
 })

  }
  displayedColumns: string[] = ['amount', 'data', 'note', 'pagatoCon'];
  payments= model.required<PaymentFraction[]>();
  paymetsListChanged = new EventEmitter<PaymentFraction[]>();
public newFractionValue = computed(() => {
  return {
    amount: this.amount(),
    paymentsDate: this.paymentsDate(),
    paymentsKey: this.paymentsKey(),
    note: this.paymentNote()
  }
})

}
