import { Injectable } from '@angular/core';


import { addRxPlugin, createRxDatabase, RxCollectionCreator, RxDatabase } from 'rxdb/plugins/core';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
@Injectable({
  providedIn: 'root'
})
export class MyDbService {
db:RxDatabase | undefined

  constructor() {
    this.initialize()
   }

   addCollection(collection: { [x: string]: RxCollectionCreator<any>; }){
     this.db?.addCollections(collection)
   }

  async initialize(){
    this.db = await createRxDatabase({
      name: 'arphoBalance',
      storage: wrappedValidateAjvStorage({
        storage: getRxStorageDexie()
      })
    });
  }
}
