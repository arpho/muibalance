import { Component, inject, model, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShoppingCartModel } from '../../../models/shoppingCartModel';
import { Subscription } from 'rxjs';
import { CartFormComponent } from '../../forms/cartGeneralDataForm/cart-form/cart-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-dialog',
  imports: [
    CartFormComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css',
  standalone: true
})
export class CartDialogComponent  implements OnInit,OnDestroy{
updatedCart(cart: { note: string; title: string; totale: number; online: boolean; delivered: boolean; buyngDate: string; key: string; deliveredDate: string; sellerKey: string; }|null) {
console.log("updatedCart", cart);
this.dialogRef.close(cart)

}
  subscriptions=new Subscription()
    ngOnInit(): void {

    }
    ngOnDestroy(): void {
  this.subscriptions.unsubscribe()
    }

    readonly dialogRef = inject(MatDialogRef<ShoppingCartModel>)
    readonly data= inject<{data:ShoppingCartModel,buttonText:string}>(MAT_DIALOG_DATA);
    readonly cart = model<ShoppingCartModel>(this.data.data)
    readonly buttonText = model(this.data.buttonText)

}
