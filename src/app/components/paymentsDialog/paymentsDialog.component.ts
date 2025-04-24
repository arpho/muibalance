import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PaymentModel } from '../../models/paymentModel';

@Component({
  selector: 'app-payments-dialog',
  imports: [],
  template: `<p>paymentsDialog works!</p>`,
  styleUrl: './paymentsDialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsDialogComponent implements OnInit {
  ngOnInit(): void {
    console.log("payment",this.payment)
  }

  readonly payment= inject<PaymentModel>(MAT_DIALOG_DATA);
 }
