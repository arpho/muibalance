export class ItemsModel {
  key=""
  prezzo = 0
  moneta= "€"
  descrizione = ""
cateoriesKey:string[]=[]
set categorieId(value: string[]) {
  this.cateoriesKey = value;
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
  serialize() {
    return {
      key: this.key,
      prezzo: this.prezzo,
      moneta: this.moneta,
      descrizione: this.descrizione,
      categoriesKey:this.cateoriesKey?.length>0?this.cateoriesKey:[],
      note: this.note,
      picture: this.picture
    }
  }



}
