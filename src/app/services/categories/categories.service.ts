import { Injectable } from '@angular/core';
import { Database, ref,get } from '@angular/fire/database';
import { doc, setDoc, Firestore, collection, where } from '@angular/fire/firestore';
import {CategoryModel} from  '../../models/categoryModel'
import { MyDbService } from '../myDb/my-db.service';
import { RxDatabase } from 'rxdb';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
db: RxDatabase | undefined;
rxCategories ={
  categorie:{
    schema:{
      version:0,
      primaryKey:"key",
      type:'string',
      properties:
     { title:{type:"string"},
      fatherKey:{type:"string"},
      userKey:{type:"string"},
      serverTimestamp:{type:"string"}
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
  private users:UsersService
) {

this.init()
}

async init(){
  this.db = this.rxDb.db
  this.userKey = (await this.users.getLoggedUser()).key
  this.db?.addCollections(this.rxCategories)
  const firebaseCollection = collection(this.firestore, 'categorie');
  const replicationState =this.replicateFirestore({
    collection:this.rxCategories,
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
  replicateFirestore(p0: {}) {
    throw new Error('Method not implemented.');
  }

async getDbCategories(userKey:string){
  console.log("userKey",userKey)
   const categoriesRef = ref(this.fireDb, `categorie/${userKey}`); // Replace with your actual Firebase database ref
   const categoriesSnapshot = await get(categoriesRef);
   const categories = categoriesSnapshot.val();
  const Categories:CategoryModel[] = [];

   Object.keys(categories).forEach((key) => {
     const category = new CategoryModel(categories[key]);
     category.setKey(key);
     Categories.push(category);
   })
   return Categories;

}

async fetchDbCategory(categoryKey:string,userKey:string){
  const rxCategories = await this.db?.['categorie'].find().exec();
  console.log("rxCategories",rxCategories)
  const categoryRef = ref(this.fireDb, `categorie/${userKey}/${categoryKey}`); // Replace with your actual Firebase database ref
  const categorySnapshot = await get(categoryRef);
  const category = categorySnapshot.val();
  return new CategoryModel(category).setKey(categoryKey)  ;
}


listCategories4User(userKey:string){
  const categoriesRef = ref(this.fireDb, `categorie/`); // Replace with your actual Firebase database ref
  return get(categoriesRef);
}

pushIntoCollection( collection:CategoryModel) {
  return setDoc(doc(this.firestore, `categorie/${collection.key}`), collection.serialize());
}
}
