import { Injectable } from '@angular/core';

import { Database, ref,get } from '@angular/fire/database';
import { collection, doc, Firestore, setDoc, where,query, getDocs, onSnapshot } from '@angular/fire/firestore';
import { MyDbService } from '../myDb/my-db.service';
import { UsersService } from '../users/users.service';
import { ShoppingCartModel } from '../../models/shoppingCartModel';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  updateCart(cart: any) {
    const refCart = doc(this.firestore, `carts/${cart.key}`);

    return setDoc(refCart, cart.serialize());
  }
  pushCart2firestore(cart: ShoppingCartModel) {
    return setDoc(doc(this.firestore, `carts/${cart.key}`), cart.serialize());
  }

  constructor(
    private firestore:Firestore,
    private fireDb:Database,
    private rxDb:MyDbService,
      private users:UsersService
  ) { }

  async getShoppingCartsFRomRealtimeDb(userKey:string) {
        const caertRef =  ref(this.fireDb, `acquisti/${userKey}`); // Replace with your
        const cartsSnapshot = await  get(caertRef);
        const carts = cartsSnapshot.val();
        const Carts:ShoppingCartModel[] = [];
        Object.keys(carts).forEach((key) => {
          const cart = new ShoppingCartModel(carts[key]);
          cart.setKey(key);
          Carts.push(cart);
        })
        return Carts
  }

  async getShoppingCartsFRomFirestore(userKey:string) {
    const q = query(collection(this.firestore, "carts"), where("userKey", "==", userKey));
    const querySnapshot = await getDocs(q);
    const Carts = querySnapshot.docs.map((doc) => {
      const cart = new ShoppingCartModel(doc.data());
      cart.setKey(doc.id);
      return cart
    })
    return Carts
  }
  getCarts4User(userKey:string) {
    //return this.getShoppingCartsFRomRealtimeDb(userKey)
    return this.getShoppingCartsFRomFirestore(userKey)
  }
  getCarts4UserOnValue(userKey:string, callback: (carts: ShoppingCartModel[]) => void) {
    const q = query(collection(this.firestore, "carts"), where("userKey", "==", userKey));
    onSnapshot(q, (querySnapshot) => {
      const Carts = querySnapshot.docs.map((doc) => {
        const cart = new ShoppingCartModel(doc.data());
        cart.setKey(doc.id);
        return cart
      })
      callback(Carts)
    })

  }
}
