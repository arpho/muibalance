
import { serverTimestamp } from "firebase/firestore";
export class PaymentModel {
  key = ''
  nome = ''
  set title(value: string) {
    this.nome=value
  }
  note = ''
  fatherPaymentKey = ''
  userKey = ''
  _deleted = false
  serverTimestamp=""

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
      userKey: this.userKey,
      serverTimestamp: serverTimestamp(),
      _deleted: this._deleted,
      note: this.note,
      fatherPaymentKey: this.fatherPaymentKey,
    };
  }
  build(arg: any) {
    Object.assign(this, arg);
    return this
  }
}
