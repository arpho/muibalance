import { Injectable, signal } from '@angular/core';


import { addRxPlugin, createRxDatabase, RxCollectionCreator, RxDatabase } from 'rxdb/plugins/core';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
@Injectable({
  providedIn: 'root'
})
export class MyDbService {
db= signal<RxDatabase | undefined>(undefined)

  constructor() {
    this.initialize()
   }

   addCollection(collection: { [x: string]: RxCollectionCreator<any>; }){
    const db = this.db()
    if(db)
     db.addCollections(collection)
   }

  async initialize(){
    console.log("initializing rxdb")
    const db =await createRxDatabase({
      name: 'arphoBalance',
      storage: wrappedValidateAjvStorage({
        storage: getRxStorageDexie()
      })
    });
    console.log("initialized rxdb db",db)
    this.db.set(db)
    console.log("initialized rxdb this.db",this.db())
  }
  getDb(){
    return this.db()}
}
