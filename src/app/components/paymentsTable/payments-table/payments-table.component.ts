import { Component, EventEmitter, model } from '@angular/core';
import { PaymentFraction } from '../../../models/paymentsFraction';

@Component({
  selector: 'app-payments-table',
  imports: [],
  templateUrl: './payments-table.component.html',
  styleUrl: './payments-table.component.css',
  standalone: true
})
export class PaymentsTableComponent {

  payments= model.required<PaymentFraction[]>();
  paymetsListChanged = new EventEmitter<PaymentFraction[]>();


}
