import { Component, model, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { PaymentsService } from '../../../services/payments/payments.service';
import { PaymentModel } from '../../../models/paymentModel';
import { UsersService } from '../../../services/users/users.service';
import {  MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paymets-selector',
  imports: [
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './paymets-selector.component.html',
  styleUrl: './paymets-selector.component.css',
  standalone: true
})
export class PaymetsSelectorComponent implements OnChanges,OnInit {
paymentsKey = model('')
$payments = signal<PaymentModel[]>([])
  constructor(
    private service: PaymentsService,
    private users:UsersService
  ) { }
  async ngOnInit() {
    const loggedUser = await this.users.getLoggedUser();
 const payments = await this.service.getPayments(loggedUser.key)
console.log("payments",payments)
this.$payments.set(payments)


  }
  ngOnChanges(changes: SimpleChanges): void {
 console.log("changes on payment viewer",changes)
  }
}
