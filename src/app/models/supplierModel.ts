export class SupplierModel{
  key= ""
  address= {
    address:"",
    latitude:0.00,
    longitude:0.00
  }
  altirude=""
  email=""
  cliente=false
  ecommerce= false
  fidelity_card=""
  nome=""
  userKey=""
  serverTimestamp=""
  note=""
  onLine=false
  _deleted=false
  constructor(data?: {}) {
    this.build(data);
  }
  build(data: {} | undefined) {
    Object.assign(this, data);
    return this
  }
  setKey(uid: string) {
    this.key = uid;
    return this
  }
  serialize() {
    return {
      address: this.address,
      altirude: this.altirude,
      userKey: this.userKey,
      serverTimestamp: this.serverTimestamp,
      email: this.email,
      cliente: this.cliente,
      ecommerce: this.ecommerce,
      fidelity_card: this.fidelity_card,
      nome: this.nome,
      note: this.note,
      onLine: this.onLine,
      _deleted: this._deleted
    };
  }
}
