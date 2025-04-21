import { serverTimestamp } from "@angular/fire/database";
import { PaymentFraction } from "./paymentsFraction";

export class ShoppingCartModel{
  key="";
  buyngDate="";
  title="";
  _deleted=false;
  currency="";
  set moneta(currency: string) {
    this.currency = currency;
  }

  set dataAcquisto(value: string) {
    this.buyngDate = value;
  }
  userKey="";
  sellerKey="";
  set fornitoreId(value: string) {
    this.sellerKey = value;
  }
  online=false;
  paymentsKey="";
  set pagamentoId(value: string) {
    this.paymentsKey = value;
  }
  totale =0;
  note="";
  payments:PaymentFraction[]=[];
  constructor(
    arg?: any
  ) {
this.build(arg);
  }
  build(arg?: any) {
    Object.assign(this, arg);
    if(this.payments.length!=0)
      this.payments = this.payments.map((payment)=>new PaymentFraction(payment))
    else
      this.payments.push(new PaymentFraction({paymentsKey:this.paymentsKey,amount:this.totale,paymentsDate:this.buyngDate}))

    return this;
  }

  setKey(uid: string) {
    this.key = uid;
    return this;
  }
  serialize(){
    return {
      key: this.key,
      buyngDate: this.buyngDate,
      title: this.title,
      _deleted: this._deleted,
      currency: this.currency,
      userKey: this.userKey,
      sellerKey: this.sellerKey,
      online: this.online,
      paymentsKey: this.paymentsKey,
      serverTimestamp: serverTimestamp(),
      totale: this.totale,
      note: this.note,
      payments: this.payments
    }
  }
}
