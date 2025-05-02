import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ShoppingCartService } from '../../services/shoppingCarts/shopping-cart.service';
import { UsersService } from '../../services/users/users.service';
import { ShoppingCartModel } from '../../models/shoppingCartModel';
import { SellersService } from '../../services/suppliers/suppliers.service';
import { SellerViewerComponent } from "../sellerViewer/sellerViewer.component";
import { MySorterPipePipe } from "../../pipes/mySorterPipe.pipe";
import { MatButtonModule } from '@angular/material/button';
import { count, Subscription } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MyMenuComponent } from '../menu/my-menu/my-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cartDialog/cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl:'./shoppingCartList.component.html' ,
  styleUrl: './shoppingCartList.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatTableModule,
    SellerViewerComponent,
    MySorterPipePipe,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MyMenuComponent
  ]
})
export class ShoppingCartListComponent implements OnInit,OnDestroy {
fixed(arg0: number,arg1: number) {
return Number(arg0).toFixed(arg1);
}
  subscriptions=new Subscription()
createCart() {
console.log("createCart")
}
  progress = signal(0)
  async uploadCarts2firestore() {
console.log("uploadCarts2firestore")
const carts = await this.service.getShoppingCartsFRomRealtimeDb((await this.users.getLoggedUser()).key)
console.log("carts",carts)
const userKey = (await this.users.getLoggedUser()).key
let count=0
const data=Object.create(null)
carts.forEach(cart=>{
  cart.userKey = userKey
data[cart.key]=cart
this.service.pushCart2firestore(cart).then(res=>{
  console.log("pushed",cart)
  count++
this.progress.set((count/carts.length)*100)
}).catch(err=>{
  console.log("err on",cart)
  console.log(err)
}).finally(()=>{
  console.log("uploaded",count, 'documents')
})
})
console.log("data",data)

}
seeCart(cart: ShoppingCartModel) {
console.log("seeCart",cart);
this.dialog.open(CartDialogComponent, {data:
{  data: cart,
  buttonText:"Update"}
});
}
  carts=signal<ShoppingCartModel[]>([])
  displayedColumns: string[] = ["title", "dataAcquisto","note", "totale","fornitore"];
  constructor (
    private users:UsersService,
    private service:ShoppingCartService,
    private Sellers:SellersService,
    private dialog:MatDialog
  ) { }
  ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
  }
  async ngOnInit(): Promise<void> {
 const carts = await  this.service.getCarts4User((await this.users.getLoggedUser()).key)
 console.log("carts",carts)
 this.carts.set(carts)
  }

  async fetchSeller(sellerKey: string) {
    const seller = await this.Sellers.fetchSeller(sellerKey)
    return seller.nome
  }

}
