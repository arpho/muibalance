import { Component, computed, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { _MatInternalFormField } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentsSelectorComponent } from "../../paymentsSelector/paymets-selector/paymets-selector.component";
import { PaymentFraction } from '../../../models/paymentsFraction';

@Component({
  selector: 'app-payment-fraction-expansion-panel',
  imports: [
    MatExpansionModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormField,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatLabel,
        MatDatepickerModule,
        PaymentsSelectorComponent

  ],
  templateUrl: './payment-fraction-expansion-panel.component.html',
  styleUrl: './payment-fraction-expansion-panel.component.css',
  standalone: true
})
export class PaymentFractionExpansionPanelComponent implements OnInit, OnChanges {
  data= input<{payment:PaymentFraction,operation:string,index?:number}|null>()
  updated= output<{payment:PaymentFraction,operation:string,index?:number}>()
  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
   console.log("changes",changes)
   if(changes["data"].currentValue)
{   this.amount.set(changes["data"].currentValue.payment.amount)
   this.paymentNote.set(changes["data"].currentValue.payment.note)
   this.paymentsDate.set(changes["data"].currentValue.payment.paymentsDate)
   this.paymentsKey.set(changes["data"].currentValue.payment.paymentsKey)
    this.newFraction = this.fb.group({
  amount: this.amount(),
  paymentsDate: this.paymentsDate(),
  note: this.paymentNote(),
  paymentsKey: this.paymentsKey()
 })
 this.panelOpenState.set(true)}
  }

  ngOnInit(): void {

this.newFraction = this.fb.group({
  amount: 0,
  paymentsDate: new Date().toISOString(),
  note: "",
  paymentsKey: ""
 })
  }
    amount= signal(0)
    paymentsListChanged = output<PaymentFraction[]>()
    paymentsDate= signal(new Date().toISOString())
    paymentNote= signal("")
    paymentsKey= signal("")
      readonly panelOpenState = signal(false)
        newFraction:FormGroup = new FormGroup({})

      public newFractionValue = computed(() => {
        return {
          amount: this.amount(),
          paymentsDate: this.paymentsDate(),
          paymentsKey: this.paymentsKey(),
          note: this.paymentNote()
        }
      })
selectedPayment($event: Event) {
console.log("selectedPayment from payment selector", $event)
}
addPayment() {
console.log("addPayment", this.newFractionValue())
}

}
