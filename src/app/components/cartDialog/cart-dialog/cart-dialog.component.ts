import { Component, inject, model, OnDestroy, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ShoppingCartModel } from '../../../models/shoppingCartModel';
import { Subscription } from 'rxjs';
import { CartFormComponent } from '../../forms/cartGeneralDataForm/cart-form/cart-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-dialog',
  imports: [
    CartFormComponent,
    ReactiveFormsModule,
    FormsModule,
    MatDialogContent,
    MatDialogModule,
    MatDialogTitle
  ],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css',
  standalone: true
})
export class CartDialogComponent  implements OnInit,OnDestroy{
  title = signal("")
makeWindowTitle() {
return `editing ${this.cart().title} ${this.cart().paiedAmount}/${this.cart().totale}`
}
updatedCart(cart: { note: string; title: string; totale: number; online: boolean; delivered: boolean; buyngDate: string; key: string; deliveredDate: string; sellerKey: string; }|null) {
console.log("updatedCart", cart);
this.cart.set(new ShoppingCartModel(cart))
this.title.set(this.makeWindowTitle())
this.dialogRef.close(cart)

}
  subscriptions=new Subscription()
    ngOnInit(): void {
this.title.set(this.makeWindowTitle())
    }
    ngOnDestroy(): void {
  this.subscriptions.unsubscribe()
    }

    readonly dialogRef = inject(MatDialogRef<ShoppingCartModel>)
    readonly data= inject<{data:ShoppingCartModel,buttonText:string}>(MAT_DIALOG_DATA);
    readonly cart = model<ShoppingCartModel>(this.data.data)
    readonly buttonText = model(this.data.buttonText)

}
