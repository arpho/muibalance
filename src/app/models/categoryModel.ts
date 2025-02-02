export class CategoryModel {
key=""
title=""
fatherKey=""
userKey=""
constructor(data?: {}) {
  this.build(data);
}
  build(data: {} | undefined) {
   Object.assign(this, data);
   return this
  }
  setKey(uid: string) {
    this.key = uid;
    return this;
  }
  setUserKey(uid: string) {
    this.userKey = uid;
    return this;
  }
get name(){
  return this.title
}
serialize() {
  return {
    title: this.title,
    fatherKey: this.fatherKey,
    userKey: this.userKey
  };
}

}
