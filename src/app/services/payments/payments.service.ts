import { Injectable } from '@angular/core';

import { Database, ref,get } from '@angular/fire/database';
import { collection, doc, Firestore, setDoc, where,query, getDocs, addDoc, getDoc } from '@angular/fire/firestore';
import { MyDbService } from '../myDb/my-db.service';
import { UsersService } from '../users/users.service';
import { PaymentModel } from '../../models/paymentModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  async fetchPayment(key: string) {
    const snapshot = await getDoc(doc(this.firestore, `payments/${key}`));
    const payment = new PaymentModel(snapshot.data());
    payment.setKey(snapshot.id);
    return payment

  }
  createPayment(payment: PaymentModel) {
   return addDoc(collection(this.firestore, `payments`), payment.serialize());
  }
  updatePayment(res: PaymentModel) {
const refPayment = doc(this.firestore, `payments/${res.key}`);

return setDoc(refPayment, res.serialize());
  }

  constructor(
      private firestore:Firestore,
  private fireDb:Database,
  private rxDb:MyDbService,
    private users:UsersService
  ) { }

   async getPayments(userKey:string){

 //return this.fetchDocumentsFromRealtimeDb(getLoggedUser.key)
 return this.fetchPaymentsFromFirestore(userKey)
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

  async fetchPaymentsFromFirestore( userKey: string) {
    const paymentsRef = collection(this.firestore, 'payments');

    const q = query(collection(this.firestore, "payments"), where("userKey", "==", userKey));
    const querySnapshot = await getDocs(q);
    const Payments = querySnapshot.docs.map((doc) => {
      const payment = new PaymentModel(doc.data());
      payment.setKey(doc.id);
      return payment
    })

    return Payments;
  }

  pushPayment2firestore(payment:PaymentModel){
    return setDoc(doc(this.firestore, `payments/${payment.key}`), payment.serialize());
  }
}
