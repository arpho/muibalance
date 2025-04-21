export class PaymentFraction{
  paymentsKey = '';
  amount= 0;
  paymentsDate = '';
  note = '';
  constructor(
    arg?: any
  ) {
    this.build(arg);
  }
  build(arg?: any) {
    Object.assign(this, arg);
    return this
  }
  serialize(){
    return {
      paymentsKey: this.paymentsKey,
      amount: this.amount,
      paymentsDate: this.paymentsDate,
      note: this.note
    }
  }
}
