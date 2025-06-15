import { serverTimestamp } from "@angular/fire/database";
import { PaymentFraction } from "./paymentsFraction";
import { _isTestEnvironment } from "@angular/cdk/platform";
import { ItemsModel } from "./itemsModel";

export class ShoppingCartModel{
  key="";
  buyngDate="";
  deliveredDate="";
  delivered=false;
  title="";
  items:ItemsModel[]=[];
  _deleted=false;
  currency="€";
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
    this.buyngDate = this.buyngDate||new Date().toISOString()

    this.items = this.items.map((item)=>new ItemsModel(item))
    if(this.payments.length!=0)
      this.payments = this.payments.map((payment)=>new PaymentFraction(payment))
    else{
    if(this.totale>0)
      this.payments.push(new PaymentFraction({paymentsKey:this.paymentsKey,amount:this.totale,paymentsDate:this.buyngDate}))}
    this.totale = this.items.reduce((acc, item) => acc + item.prezzo, 0);

    return this;
  }

  get fullText() {
    const itemsFullText = this.items.map((item) => item.fullText).join(' ');
    const paymentsFullText = this.payments.map((payment) => payment.fullText).join(' ');
    return `${this.title} ${this.note} ${itemsFullText} ${paymentsFullText}`;
  }
get paiedAmount(){
  return this.payments.reduce((acc, payment) => acc + payment.amount, 0);
}
  setKey(uid: string) {
    this.key = uid;
    return this;
  }
  serialize(){
    return {
      key: this.key,
      buyngDate: this.buyngDate,
      deliveredDate: this.deliveredDate,
      title: this.title,
      _deleted: this._deleted,
      currency: this.currency,
      userKey: this.userKey,
      sellerKey: this.sellerKey,
      delivered: this.delivered,
      online: this.online,
      paymentsKey: this.paymentsKey,
      serverTimestamp: serverTimestamp(),
      totale: this.totale,
      note: this.note,
      items: this.items.map((item)=>item.serialize()),
      payments: this.payments.map((payment)=>payment.serialize())
    }
  }
}
