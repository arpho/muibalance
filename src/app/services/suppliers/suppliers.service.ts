import { Injectable } from '@angular/core';
import { Database, ref,get } from '@angular/fire/database';
import { collection, doc, Firestore, setDoc, where,query, getDocs } from '@angular/fire/firestore';
import { MyDbService } from '../myDb/my-db.service';
import { UsersService } from '../users/users.service';
import { SupplierModel } from '../../models/supplierModel';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {


constructor(
  private firestore:Firestore,
  private fireDb:Database,
  private rxDb:MyDbService,
  private users:UsersService,

) { }
  async getSuppliers4User(userKey:string) {
return  this.fetchSellers4userFromFirestore(userKey) //this.fetchSuppliers4userFromDb(userKey)

}
  async fetchSellers4userFromFirestore(userKey: string) {
    const q = query(collection(this.firestore, "sellers"), where("userKey", "==", userKey));
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot",querySnapshot)
    const sellers:SupplierModel[] = [];
    querySnapshot.forEach((doc) => {
      const supplier = new SupplierModel(doc.data());
      supplier.setKey(doc.id);
      sellers.push(supplier);
    });
    return sellers
  }


  async fetchSuppliers4userFromDb(userKey: string) {
 console.log(`fetching suppliers from real db for user ${userKey}`)
 const sellersRef =  ref(this.fireDb, `fornitori/${userKey}`); // Replace with your
   const sellersSnapshot = await get(sellersRef);
    const sellers = sellersSnapshot.val();
   const Sellers:SupplierModel[] = [];
   console.log("sellers",sellers);
   Object.keys(sellers).forEach((key) => {
     const supplier = new SupplierModel(sellers[key]);
     supplier.setKey(key);
     Sellers.push(supplier);
   })
   return Sellers
 // actual Firebase database ref
  }

  pushIntoCollection( seller:SupplierModel) {
    return setDoc(doc(this.firestore, `sellers/${seller.key}`), seller.serialize());
  }



}
