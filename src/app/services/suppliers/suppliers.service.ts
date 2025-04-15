import { Injectable } from '@angular/core';
import { Database, ref,get } from '@angular/fire/database';
import { Firestore } from '@angular/fire/firestore';
import { MyDbService } from '../myDb/my-db.service';
import { UsersService } from '../users/users.service';
import { SupplierModel } from '../../models/supplierModel';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
getSuppliers4User(userKey:string) {
return this.fetchSuppliers4userFromDb(userKey)
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

constructor(
  private firestore:Firestore,
  private fireDb:Database,
  private rxDb:MyDbService,
  private users:UsersService,

) { }


}
