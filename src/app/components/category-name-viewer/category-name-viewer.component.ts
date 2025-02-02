import { Component, OnInit,Input, signal } from '@angular/core';
import { CategoriesService } from '../../services/categories/categories.service';
import { CategoryModel } from '../../models/categoryModel';

@Component({
  selector: 'app-category-name-viewer',
  imports: [],
  templateUrl: './category-name-viewer.component.html',
  styleUrl: './category-name-viewer.component.css'
})
export class CategoryNameViewerComponent implements OnInit {
  category = signal(new CategoryModel({title:""}))

  @Input({required: true}) categoryKey: string = ''
  @Input({required: true}) userKey: string = ''
  constructor(
    private service: CategoriesService
  ) { }
  async ngOnInit(){
    console.log("categoryKey",this.categoryKey)
    console.log("userKey",this.userKey)
    if(this.categoryKey!="")
    {
    const  category = await this.service.fetchDbCategory(this.categoryKey,this.userKey);
    this.category.set(category);}

  }

}
