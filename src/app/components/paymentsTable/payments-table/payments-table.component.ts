import { Component, EventEmitter, model, OnInit } from '@angular/core';
import { PaymentFraction } from '../../../models/paymentsFraction';
import {  MatTableModule } from '@angular/material/table';
import { PaymentViewerComponent } from "../../payment-viewer/payment-viewer.component";

@Component({
  selector: 'app-payments-table',
  imports: [
    MatTableModule,
    PaymentViewerComponent,
    PaymentViewerComponent
],
  templateUrl: './payments-table.component.html',
  styleUrl: './payments-table.component.css',
  standalone: true
})
export class PaymentsTableComponent  implements OnInit{
  ngOnInit(): void {
 console.log("payments",this.payments())
  }
  displayedColumns: string[] = ['amount', 'data', 'note', 'pagatoCon'];
  payments= model.required<PaymentFraction[]>();
  paymetsListChanged = new EventEmitter<PaymentFraction[]>();


}
