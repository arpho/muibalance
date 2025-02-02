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
