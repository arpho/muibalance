export class ItemsModel {
  key=""
  prezzo = 0
  moneta= "€"
  descrizione = ""
categoriesKey:string[]=[]
set categorieId(value: string[]) {
  this.categoriesKey = value;
}
  note=""
  picture=""
  constructor(arg?:any) {
    this.build(arg);
  }
  build(arg:any) {
    Object.assign(this, arg);
    return this
  }
  get fullText() {
    return `${this.prezzo} ${this.moneta} ${this.descrizione} ${this.note}`
  }
  serialize() {
    return {
      key: this.key,
      prezzo: this.prezzo,
      moneta: this.moneta,
      descrizione: this.descrizione,
      categoriesKey:this.categoriesKey?.length>0?this.categoriesKey:[],
      note: this.note,
      picture: this.picture
    }
  }



}
