import { Component, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { UsersService } from '../../services/users/users.service';
import { CategoryModel } from '../../models/categoryModel';
import {MatTableModule} from '@angular/material/table';
import { CategoryNameViewerComponent } from "../category-name-viewer/category-name-viewer.component";
import { UserModel } from '../../models/userModel';
@Component({
  selector: 'app-categories-list',
  imports: [MatTableModule, CategoryNameViewerComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
  standalone: true
})
export class CategoriesListComponent  implements OnInit {
async importCategories2firestore() {
  let count=0
console.log("categoria 0",this.Categories()[0])
const category = this.Categories()[0];
const userKey = this.user.key;
this.Categories().forEach(async (category) => {
  category.setUserKey(userKey);
   this.service.pushIntoCollection(category).then(() => {
     count++;
   }).catch((error) => {
     console.error('Error pushing category into Firestore:', error);
   }).finally(() => {
     if (count === this.Categories().length) {
       console.log('All categories pushed into Firestore successfully');
     }
   });

})
}
Categories = signal<CategoryModel[]>([]);
displayedColumns: string[] = ['name','fatherName'];
user= new UserModel();
  constructor(
    private service: CategoriesService,
    private users: UsersService
  ) { }
  async ngOnInit() {
    this.user =  await this.users.getLoggedUser();

  const categories = await this.service.getDbCategories(this.user.key);
  console.log("categories",categories)
  this.Categories.set(categories);
  }
}
