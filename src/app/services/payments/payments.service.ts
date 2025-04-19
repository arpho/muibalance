import { Injectable } from '@angular/core';

import { Database, ref,get } from '@angular/fire/database';
import { collection, doc, Firestore, setDoc, where,query, getDocs } from '@angular/fire/firestore';
import { MyDbService } from '../myDb/my-db.service';
import { UsersService } from '../users/users.service';
import { PaymentModel } from '../../models/paymentModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
      private firestore:Firestore,
  private fireDb:Database,
  private rxDb:MyDbService,
    private users:UsersService
  ) { }

   async getPayments(){
 const getLoggedUser = await this.users.getLoggedUser()
 return this.fetchDocumentsFromRealtimeDb(getLoggedUser.key)
  }
  async fetchDocumentsFromRealtimeDb(key: string) {
    const sellersRef =  ref(this.fireDb, `pagamenti/${key}`); // Replace with your
    const paymentsSnapshot = await get(sellersRef);
     const payments = paymentsSnapshot.val();
    const Payments:PaymentModel[] = [];
    Object.keys(payments).forEach((key) => {
      const payment = new PaymentModel(payments[key]);
      payment.setKey(key);
      Payments.push(payment);
    })
    return Payments
  }
}
