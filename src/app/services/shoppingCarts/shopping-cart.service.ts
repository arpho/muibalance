import { Injectable } from '@angular/core';

import { Database, ref,get } from '@angular/fire/database';
import { collection, doc, Firestore, setDoc, where,query, getDocs } from '@angular/fire/firestore';
import { MyDbService } from '../myDb/my-db.service';
import { UsersService } from '../users/users.service';
import { ShoppingCartModel } from '../../models/shoppingCartModel';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

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
  getCarts4User(userKey:string) {
    return this.getShoppingCartsFRomRealtimeDb(userKey)
  }
}
