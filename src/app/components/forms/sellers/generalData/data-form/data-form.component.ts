import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerModel } from '../../../../../models/supplierModel';
import { NotFoundError } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-data-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css',
  standalone: true
})
export class DataFormComponent {
  dataForm:FormGroup = new FormGroup({})
  @Input({required:true})seller = new SellerModel()
  constructor(private fb:FormBuilder) {
    this.dataForm = this.fb.group({
      name: this.seller.nome,
      ecommerce: this.seller.ecommerce,
      cliente: this.seller.cliente,
      note: this.seller.note
    })
   }
   initializeForm(){
    this.dataForm = this.fb.group({
      name: this.seller.nome,
      ecommerce: this.seller.ecommerce,
      cliente: this.seller.cliente,
      note: this.seller.note
    })
    return this.dataForm
   }

}
