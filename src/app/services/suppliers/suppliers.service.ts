import { onValue, set } from 'firebase/database';
import { Injectable } from '@angular/core';
import { Database, ref,get } from '@angular/fire/database';
import { collection, doc, Firestore, setDoc, where,query, getDocs, getDoc,addDoc, onSnapshot } from '@angular/fire/firestore';
import { MyDbService } from '../myDb/my-db.service';
import { UsersService } from '../users/users.service';
import { SellerModel } from '../../models/supplierModel';
import { RxDatabase } from 'rxdb';
import { replicateFirestore } from 'rxdb/plugins/replication-firestore';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  getSuppliers4UserOnValue(userKey: string, callback: (sellers: SellerModel[]) => void) {
    const q = query(collection(this.firestore, "sellers"), where("userKey", "==", userKey));
  onSnapshot(q, (querySnapshot) => {
    console.log("snapshot")
    const Sellers = querySnapshot.docs.map((doc: { data: () => {} | undefined; id: string; }) => {
      const seller = new SellerModel(doc.data());
      seller.setKey(doc.id);
      return seller
    })

    callback(Sellers)
  })

  }
  createSupplier(seller: SellerModel) {
    collection(this.firestore, `sellers`);
    return addDoc(collection(this.firestore, `sellers`), seller.serialize());
  }
  updateSupplier(seller: SellerModel) {
    return setDoc(doc(this.firestore, `sellers/${seller.key}`), seller.serialize());
  }
   async fetchSeller(sellerKey: string) {


let seller = new SellerModel({});

    const q = doc(this.firestore, `sellers/${sellerKey}`);
    const querySnapshot = await getDoc(q);
   seller.build(querySnapshot.data()).setKey(sellerKey)
       return seller
  }
  db: RxDatabase | undefined;
rxSellers ={
  sellers:{
    schema:{
      version:0,
      primaryKey:"key",
      type:'string',
      properties:
     { nome:{type:"string"},
      rootSellerKey:{type:"string"},
      userKey:{type:"string"},
      serverTimestamp:{type:"string"},
      onLine:{type:"boolean"},
      email:{type:"string"},
      cliente:{type:"boolean"},
      ecommerce:{type:"boolean"},
      fidelity_card:{type:"string"},
      address:{
        type:"object",
        properties:{
          address:{type:"string"},
          latitude:{type:"number"},
          longitude:{type:"number"}
        }
      },
      note:{type:"string"}
    },
  required:['key','userKey','timestamp'],
  }
  }
  }
  userKey: string = "";


constructor(
  private firestore:Firestore,
  private fireDb:Database,
  private rxDb:MyDbService,
  private users:UsersService,

) {
  this.init()
 }

 runReplicateFirestore(p0: any) {
  replicateFirestore(p0);
 }

async init(){
  this.db = this.rxDb.getDb()
  this.userKey = (await this.users.getLoggedUser()).key
  const rxCollection =await  this.db?.addCollections(this.rxSellers)
  try{
  this.db?.addCollections(this.rxSellers)
  } catch (error) {
    console.error(error)
  }
  const firebaseCollection = collection(this.firestore, 'sellers');
  const replicationState =this.runReplicateFirestore({
    collection:rxCollection,
    firestore:{projectId:"fir-6062c",
      database:this.fireDb,
      collection:firebaseCollection},
      pull:{
        filter:[
           where("userKey","==",this.userKey)
        ]
      }

    }
  )

}
  async getSuppliers4User(userKey:string) {
return  this.fetchSellers4userFromFirestore(userKey) //this.fetchSuppliers4userFromDb(userKey)

}
  async fetchSellers4userFromFirestore(userKey: string) {
    const q = query(collection(this.firestore, "sellers"), where("userKey", "==", userKey));
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot",querySnapshot)
    const sellers:SellerModel[] = [];
    querySnapshot.forEach((doc) => {
      const supplier = new SellerModel(doc.data());
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
   const Sellers:SellerModel[] = [];
   console.log("sellers",sellers);
   Object.keys(sellers).forEach((key) => {
     const supplier = new SellerModel(sellers[key]);
     supplier.setKey(key);
     Sellers.push(supplier);
   })
   return Sellers
 // actual Firebase database ref
  }

  pushIntoCollection( seller:SellerModel) {
    return setDoc(doc(this.firestore, `sellers/${seller.key}`), seller.serialize());
  }



}
