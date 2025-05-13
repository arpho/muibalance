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
import { PaymetsSelectorComponent } from "../../paymentsSelector/paymets-selector/paymets-selector.component";
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
    PaymetsSelectorComponent,
    MatMenuModule,
    MatIconModule,
    PaymentFractionExpansionPanelComponent
],
  templateUrl: './payments-table.component.html',
  styleUrl: './payments-table.component.css',
  standalone: true
})
export class PaymentsTableComponent  implements OnInit{
insertPayment() {
console.log("insertPayment from payment selector",this.newFractionValue())
this.panelOpenState.set(false)
}
selectedPayment($event: Event) {
console.log("selectedPayment from payment selector", $event)
}
addPayment() {
console.log("addPayment", this.newFractionValue())
this.payments.set([...this.payments(), new PaymentFraction(   this.newFractionValue())])
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
