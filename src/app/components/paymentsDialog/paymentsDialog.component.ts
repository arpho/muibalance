import { UsersService } from './../../services/users/users.service';
import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,

  MatDialogTitle,
} from '@angular/material/dialog';
import { PaymentModel } from '../../models/paymentModel';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentsService } from '../../services/payments/payments.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payments-dialog',
  imports: [MatDialogTitle,
     MatDialogContent,
      MatDialogActions,
       MatDialogClose,
       MatInputModule,
       MatLabel,
       ReactiveFormsModule,
       FormsModule,
       MatFormFieldModule,
       MatSelectModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: `./paymentsDialog.component.html`,
  styleUrl: './paymentsDialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class PaymentsDialogComponent implements OnInit {
updatePayment() {
console.log("updatePayment",this.payment())
this.dialogRef.close(this.payment())
}
  readonly dialogRef = inject(MatDialogRef<PaymentsDialogComponent>)
  readonly data= inject<{data:PaymentModel,buttonText:string}>(MAT_DIALOG_DATA);
  readonly payment = model(this.data.data)
  readonly buttonText = model(this.data.buttonText)

  paymentForm:FormGroup = new FormGroup({
    nome: new  FormControl(this.payment().nome),
  fatherPaymentKey: new FormControl(this.payment().fatherPaymentKey),
    note:new FormControl(this.payment().note)
  })
  async ngOnInit() {
    console.log("payment",this.payment())
    const loggedUser = await this.Users.getLoggedUser();
    const payments = await this.paymentsService.getPayments(loggedUser.key)
    this.payments.set(payments)
    this.paymentForm = this.fb.group({
      nome: new  FormControl(this.payment().nome),
    fatherPaymentKey: new FormControl(this.payment().fatherPaymentKey),
      note:new FormControl(this.payment().note)
    })

  }

  payments = signal<PaymentModel[]>([])

  constructor(
    private fb:FormBuilder,
    private paymentsService:PaymentsService,
    private Users:UsersService
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
 }
