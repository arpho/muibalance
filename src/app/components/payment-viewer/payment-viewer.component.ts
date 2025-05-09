import { Component, Input, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { PaymentsService } from '../../services/payments/payments.service';
import { PaymentModel } from '../../models/paymentModel';

@Component({
  selector: 'app-payment-viewer',
  imports: [],
  templateUrl: './payment-viewer.component.html',
  styleUrl: './payment-viewer.component.css',
  standalone: true
})
export class PaymentViewerComponent implements OnChanges{
@Input({required: true}) paymentsKey: string = ''
  payment = signal<PaymentModel|null>(null)
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
 console.log("changes on payment viewer",changes)
 if(changes['paymentsKey'].currentValue)  {
const payment = await this.service.fetchPayment(changes['paymentsKey'].currentValue)
console.log("fetch payment",payment)
this.payment.set(payment)
 }
  }
  constructor(
    private service: PaymentsService
  ) { }

}
