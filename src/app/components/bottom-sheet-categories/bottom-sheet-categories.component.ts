import { Form, FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CategoryViewerComponent } from '../category-viewer/category-viewer.component';
import { CategoryModel } from '../../models/categoryModel';
import { CategoriesService } from '../../services/categories/categories.service';
import { UsersService } from '../../services/users/users.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FilterPipe } from "../../pipes/filterPipe/filter-pipe.pipe";

@Component({
  selector: 'app-bottom-sheet-categories',
  imports: [
    CategoryViewerComponent,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    FilterPipe
],
  templateUrl: './bottom-sheet-categories.component.html',
  styleUrl: './bottom-sheet-categories.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class BottomSheetCategoriesComponent implements OnInit {
    constructor(
    private service:CategoriesService,
    private users:UsersService
  ) {}
  requestedCategory= signal<string>("")
  async createCategory() {
console.log("createCategory", this.requestedCategory())
const cat = new CategoryModel({title: this.requestedCategory()})
const loggedUder = await this.users.getLoggedUser()
cat.userKey = loggedUder.key
const newCat = await this.service.createCategory(cat)
this.categoriesKey.set([...this.categoriesKey(),newCat.key])
}
closeDialog() {
console.log("closeDialog")
this.MatBottomSheetRef.dismiss(this.categoriesKey())
}

  async fetchCategoriesList(categoriesList: string[], cat: CategoryModel) {
    console.log("fetchCategoriesList to be added",categoriesList)
    categoriesList.push(cat.key)
    if (cat.fatherKey) {
  const father = await this.service.fetchCategoryFromFirestore(cat.fatherKey)
      await this.fetchCategoriesList(categoriesList,father)
    }
    return categoriesList
  }
  async selectCategory(_t13: CategoryModel) {
console.log("selectCategory",_t13)
console.log("categoriesKey",this.categoriesKey())
const categories2BeAdded:string[]= await this.fetchCategoriesList(this.categoriesKey()||[],_t13)
this.categoriesKey.set(Array.from(new Set([...this.categoriesKey(),...categories2BeAdded])))
}
searchInput="";
searchFilter =(cat:CategoryModel)=>true;
filterCategories($event: any) {
    this.requestedCategory.set($event.target.value)
  this.searchFilter = (cat:CategoryModel)=>{
    return cat.title.toLowerCase().includes($event.target.value.toLowerCase().trim())}
}
searchText: any;
assignCategories() {
throw new Error('Method not implemented.');
}

  categories= signal<CategoryModel[]>([])
selectedCategory($event: string) {
console.log("selectedCategory tobe removed", $event)
this.categoriesKey.set(this.categoriesKey().filter(cat => cat != $event))

}
  categoriesKey = signal<string[]>([])
  async ngOnInit(): Promise<void> {
    console.log("data",this.data)
    this.categoriesKey.set(this.data.categoriesKey||[])
    const loggedUser =await  this.users.getLoggedUser()
    const categories = await this.service.listCategories4User(loggedUser.key)
    this.categories.set(categories)
  }
     readonly data = inject<{categoriesKey:string[]}>(MAT_BOTTOM_SHEET_DATA)
        readonly MatBottomSheetRef = inject(MatBottomSheetRef)

}
