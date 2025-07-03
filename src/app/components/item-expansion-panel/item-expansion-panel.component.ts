import { ChangeDetectionStrategy, Component, computed, input, model, OnChanges, OnDestroy, output, signal, SimpleChanges } from '@angular/core';
import { ItemsModel } from '../../models/itemsModel';
import { ReactiveFormsModule, FormsModule, FormGroup, Form, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CateoriesSelectorComponent } from '../cateories-selector/cateories-selector.component';
import { Subscription } from 'rxjs';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-expansion-panel',
  imports: [MatExpansionModule,

        ReactiveFormsModule,
        FormsModule,
        MatFormField,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatLabel,
        MatButtonModule,
        MatIconModule,
      CateoriesSelectorComponent
      ],
  templateUrl: './item-expansion-panel.component.html',
  styleUrl: './item-expansion-panel.component.css',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ItemExpansionPanelComponent implements OnChanges, OnDestroy{
submitItem() {
console.log("submitItem",this.itemValue())
this.updated.emit({item:new ItemsModel(this.itemValue()),operation:this.data()?.operation!,index:this.data()?.index})
this.isPanelOpen.set(false)
}
  subscription = new Subscription()
selectedCategory($event: string[]) {
console.log("selectedCategory", $event)

this.categoriesKey.set($event)
const item = new ItemsModel(this.itemValue())
console.log("updated item",item)
this.updated.emit({item:item,operation:this.data()?.operation!,index:this.data()?.index})
}

  data=input<{item:ItemsModel,operation:string,index?:number }|null>()
  updated=output<{item:ItemsModel,operation:string,index?:number}>()
  descrizione=signal("")
  note=signal("")
  prezzo=signal(0)
  moneta=signal("")
  picture=signal("")
  categoriesKey=signal<string[]>([])

isPanelOpen=signal(false)
itemForm : FormGroup = new FormGroup({})
itemValue = computed(() => {
  return {
    descrizione: this.descrizione(),
    note: this.note(),
    prezzo: this.prezzo(),
    moneta: this.moneta(),
    picture: this.picture(),
    categoriesKey: this.categoriesKey()
  }
})
immagine: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    if(changes["data"].currentValue){
      console.log("data",changes["data"].currentValue)
      this.descrizione.set(changes["data"].currentValue.item.descrizione)
      this.note.set(changes["data"].currentValue.item.note)
      this.prezzo.set(changes["data"].currentValue.item.prezzo)
      this.moneta.set(changes["data"].currentValue.item.moneta)
      this.picture.set(changes["data"].currentValue.item.picture)
      this.categoriesKey.set(changes["data"].currentValue.item.categoriesKey)
      this.isPanelOpen.set(true)
      this.itemForm = this.fb.group({
        descrizione: this.descrizione(),
        note: this.note(),
        prezzo: this.prezzo(),
        moneta: this.moneta(),
        picture: this.picture(),
        categoriesKey: []
      })
      this.subscription.add(this.itemForm.valueChanges.subscribe((value) => {
          this.descrizione.set(value.descrizione)
          this.note.set(value.note)
          this.prezzo.set(value.prezzo)
          this.moneta.set(value.moneta)
          this.picture.set(value.picture)
      }))

    }
  }
  constructor(
    private fb:FormBuilder
  ) {
    this.itemForm = this.fb.group({
      descrizione: "",
      note: "",
      prezzo: 0,
      moneta: "€",
      picture: "",
    })
  }
  ngOnDestroy(): void {
this.subscription.unsubscribe()
  }

}
