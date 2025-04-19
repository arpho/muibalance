import { Component, OnInit, signal } from '@angular/core';
import { PaymentsService } from '../../services/payments/payments.service';
import { PaymentModel } from '../../models/paymentModel';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../services/users/users.service';
import { serverTimestamp } from '@angular/fire/database';

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
async uploadPayments2firestore() {
  const loggedUser = await this.usersService.getLoggedUser();

  const payments = await this.service.fetchDocumentsFromRealtimeDb(loggedUser.key)
console.log("upload payments",payments)
payments.forEach(payment=>{
  payment.userKey = loggedUser.key
  payment.serverTimestamp = serverTimestamp().toString()
  console.log("timestamp",serverTimestamp())
  this.service.pushPayment2firestore(payment).then(res=>{
    console.log("pushed",payment)
  }).catch(err=>{
    console.log("err on",payment)
    console.error(err)
  })

})
}
progress=40
payments = signal<PaymentModel[]>([])
displayedColumns: string[] = ['nome', 'note',];
  constructor(
    private service: PaymentsService,
    private usersService: UsersService
  ) { }

  async ngOnInit() {
    const payments = await this.service.getPayments()
    console.log("payments",payments)
    this.payments.set(payments)

  }

}
