import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PaymentsService } from '../../services/payments/payments.service';
import { PaymentModel } from '../../models/paymentModel';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../services/users/users.service';
import { serverTimestamp } from '@angular/fire/database';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PaymentsDialogComponent } from '../paymentsDialog/paymentsDialog.component';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MyMenuComponent } from '../menu/my-menu/my-menu.component';

@Component({
  selector: 'app-paymentsList',
  templateUrl: './paymentsList.component.html',
  styleUrls: ['./paymentsList.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSnackBarModule,
    MatIcon,
    MatToolbarModule,
    MyMenuComponent
  ],
})
export class PaymentsListComponent implements OnInit, OnDestroy {
createPayment() {
console.log("createPayment")
const dialogRef = this.dialog.open(PaymentsDialogComponent, {
  data: { data: new PaymentModel(), buttonText: 'Create' },

})
this.subscriptions.add(dialogRef.afterClosed().subscribe(res => {
  if (res) {
    console.log("res for created payment ", res)
    this.service.createPayment(res).then(res => {
      console.log("created", res)
      this._snackBar.open('Payment created successfully', 'Close', {
        duration: 3000,
      })
    }).catch(err => {
      console.error(err)
      this._snackBar.open('Error creating payment', 'Close', {
        duration: 3000,
      })
    })
  }
}))
}
  readonly dialog = inject(MatDialog);
  subscriptions = new Subscription()



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
    private usersService: UsersService,
    private _snackBar: MatSnackBar
  ) { }

  seePayment(_t36: any) {
    console.log("seePayment",_t36);
    const dialogRef = this.dialog.open(PaymentsDialogComponent, {
      data: { data: _t36, buttonText: 'Update' },

    })
    this.subscriptions.add(dialogRef.afterClosed().subscribe(res=>{
      if(res){
       console.log("edited payment",res)
       if(res.key){
        this.service.updatePayment(res).then(res=>{
          this._snackBar.open('Payment updated successfully', 'Close', {

          })
        }).catch(err=>{
          console.error(err)
          this._snackBar.open('Error updating payment', 'Close', {

          })
        })
       }
      }
    }))
    }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  async ngOnInit() {
    const loggedUser = await this.usersService.getLoggedUser();
    const payments = await this.service.getPayments(loggedUser.key)
    console.log("payments",payments)
    this.payments.set(payments)

  }

}
