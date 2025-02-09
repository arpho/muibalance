import { Injectable } from '@angular/core';
import { Database, ref,get } from '@angular/fire/database';
import { doc, setDoc, Firestore } from '@angular/fire/firestore';
import {CategoryModel} from  '../../models/categoryModel'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

constructor(
  private firestore:Firestore,
  private db:Database
) { }

async getDbCategories(userKey:string){
  console.log("userKey",userKey)
   const categoriesRef = ref(this.db, `categorie/${userKey}`); // Replace with your actual Firebase database ref
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
  const categoryRef = ref(this.db, `categorie/${userKey}/${categoryKey}`); // Replace with your actual Firebase database ref
  const categorySnapshot = await get(categoryRef);
  const category = categorySnapshot.val();
  return new CategoryModel(category).setKey(categoryKey)  ;
}


listCategories4User(userKey:string){
  const categoriesRef = ref(this.db, `categorie/`); // Replace with your actual Firebase database ref
  return get(categoriesRef);
}

pushIntoCollection( collection:CategoryModel) {
  return setDoc(doc(this.firestore, `categorie/${collection.key}`), collection.serialize());
}
}
