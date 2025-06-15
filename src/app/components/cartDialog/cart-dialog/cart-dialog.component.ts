import {
  Component,
  computed,
  inject,
  model,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
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
    MatDialogTitle,
  ],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css',
  standalone: true,
})
export class CartDialogComponent implements OnInit, OnDestroy {
  title = computed(() => this.makeWindowTitle());
  makeWindowTitle() {
    const total = Math.round(this.cart().totale * 100) / 100;
    const paiedAmount = Math.round(this.cart().paiedAmount * 100) / 100;
    return `editing ${this.cart().title} `;
  }
  updatedCart(data: {
    cart: ShoppingCartModel;
    submitted?: boolean;
    closeDialog?: boolean;
  }) {
    const cart = data.cart;
    this.cart.set(new ShoppingCartModel(cart));

    if (data.closeDialog) {
      this.dialogRef.close(cart);
    }
  }
  subscriptions = new Subscription();
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  readonly dialogRef = inject(MatDialogRef<ShoppingCartModel>);
  readonly data = inject<{ data: ShoppingCartModel; buttonText: string }>(
    MAT_DIALOG_DATA
  );
  readonly cart = model<ShoppingCartModel>(this.data.data);
  readonly buttonText = model(this.data.buttonText);
}
