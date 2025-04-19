import { Component, OnInit, signal } from '@angular/core';
import { PaymentsService } from '../../services/payments/payments.service';
import { PaymentModel } from '../../models/paymentModel';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-paymentsList',
  templateUrl: './paymentsList.component.html',
  styleUrls: ['./paymentsList.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatProgressBarModule
  ],
})
export class PaymentsListComponent implements OnInit {
payments = signal<PaymentModel[]>([])
displayedColumns: string[] = ['nome', 'note',];
  constructor(
    private service: PaymentsService
  ) { }

  async ngOnInit() {
    const payments = await this.service.getPayments()
    console.log("payments",payments)
    this.payments.set(payments)

  }

}
