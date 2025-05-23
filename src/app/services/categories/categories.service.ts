import { Injectable, InputOptionsWithoutTransform, InputOptionsWithTransform, InputSignal, InputSignalWithTransform } from '@angular/core';
import { Database, ref,get } from '@angular/fire/database';
import { doc, setDoc, Firestore, collection, where, getDoc } from '@angular/fire/firestore';
import {CategoryModel} from  '../../models/categoryModel'
import { MyDbService } from '../myDb/my-db.service';
import { RxDatabase } from 'rxdb';
import { UsersService } from '../users/users.service';
import { replicateFirestore } from 'rxdb/plugins/replication-firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  async fetchCategoryFromFirestore(categoryKey: string) {
    console.log("categoryKey",categoryKey)
       let category = new CategoryModel();
    try{
    const collectionRef = collection(this.firestore, 'categorie');
    // Replace with your actual Firebase database ref
    const snapshot = await getDoc(doc(collectionRef, categoryKey));
     category = new CategoryModel(snapshot.data());
     category.setKey(categoryKey);
    console.log("fetched category",category)

  }
    catch(e){
      console.log("error",e)
      console.error(e)
    }
    finally{
      return category;
    }


  }
db: RxDatabase | undefined;
rxCategories ={
  categorie:{
    schema:{
      version:0,
      title:"categorie",
      description:" dfinisce  una categoria",
      primaryKey:"key",
      type:"object",

      properties:
     { title:{type:"string"},
     key:{type:"string",
      maxLength:100
     },
      fatherKey:{type:"string"},
      userKey:{type:"string"},
    },

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

async init(){
  this.db = this.rxDb.getDb()
  console.log(" initialized this.db",this.db)
  this.userKey = (await this.users.getLoggedUser()).key

  try {
    console.log("this.db in init",this.rxDb.getDb())
  const donno = await this.db?.addCollections(this.rxCategories).then (async () => {
      const collections =  this.db?.collections
    console.log("collections",collections)

  }).catch((error) => {
    console.error(error);
  });


  } catch (error) {
    console.error(error)
  }
  const firebaseCollection = collection(this.firestore, 'categorie');
  const replicationState =this.runReplicateFirestore({
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
  runReplicateFirestore(p0: any) {
   replicateFirestore(p0);
  }

async getDbCategories(userKey:string){
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
getCategoriesFromRxDb(){
  return new Promise<CategoryModel[]>((resolve, reject) => {
    this.db?.['categorie'].find().exec().then((categories) => {
      const categoriesArray: CategoryModel[] = [];
      categories.forEach((category) => {
        const categoryModel = new CategoryModel(category);
        categoryModel.setKey(category.key);
        categoriesArray.push(categoryModel);
      });
      resolve(categoriesArray);
    }).catch((error) => {
      reject(error);
    });

  })
}
}
