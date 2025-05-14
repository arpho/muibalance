import { Component, computed, output, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
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
export class PaymentFractionExpansionPanelComponent {
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
throw new Error('Method not implemented.');
}
addPayment() {
throw new Error('Method not implemented.');
}

}
