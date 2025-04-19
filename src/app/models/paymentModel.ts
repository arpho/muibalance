export class PaymentModel {
  key = ''
  nome = ''
  set title(value: string) {
    this.nome=value
  }
  note = ''
  fatherPaymentKey = ''
  constructor(arg:any) {


    this.build(arg);
  }

  setKey(uid: string) {
    this.key = uid;
    return this;
  }
  serialize() {
    return {
      key: this.key,
      nome: this.nome,
      note: this.note,
      fatherPaymentKey: this.fatherPaymentKey,
    };
  }
  build(arg: any) {
    Object.assign(this, arg);
    return this
  }
}
