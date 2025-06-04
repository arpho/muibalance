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
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl:'./shoppingCartList.component.html' ,
  styleUrl: './shoppingCartList.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
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
  constructor (
    private users:UsersService,
    private service:ShoppingCartService,
    private Sellers:SellersService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar
  ) { }
fixed(arg0: number,arg1: number) {
return Number(arg0).toFixed(arg1);
}
  subscriptions=new Subscription()
createCart() {
console.log("createCart")
   //history
const  dialogRef =  this.dialog.open(CartDialogComponent,{data:{data:new ShoppingCartModel({}),buttonText:"Crea Carrello"}})
this.subscriptions.add(dialogRef.afterClosed().subscribe(async cart=>{
  if(cart){
    const kart = new ShoppingCartModel(cart)

    const loggedUser =await  this.users.getLoggedUser()
    kart.userKey = loggedUser.key
    const seller = await this.Sellers.fetchSeller(kart.sellerKey)
    kart.title = kart.title || `${seller.nome}  del ${kart.buyngDate}`


    console.log("cart to be stored",kart)

   /* this.service.createCart(cart).then(res=>{
      console.log("created",res)
      this.snackBar.open('Cart created successfully', 'Close', {
        duration: 3000,
      })
    }).catch(err=>{
      console.error(err)
      this.snackBar.open('Error creating cart', 'Close', {
        duration: 3000,
      })
    })*/
  }
}))

this.subscriptions.add(dialogRef.afterClosed().subscribe(res=>{
  if(res){
    console.log("cart to be stored",res)
  }
}))
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
const dialogRef = this.dialog.open(CartDialogComponent, {data:
{  data: cart,
  buttonText:"Update"}
});
this.subscriptions.add(dialogRef.afterClosed().subscribe(res=>{
  if(res){
    console.log("cart to be stored",res)
    this.service.updateCart(res).then(res=>{
      console.log("updated",res);
      this.snackBar.open('Carrello aggiornato con successo', 'Close', {

      })
    }).catch(err=>{
      console.error(err)
      this.snackBar.open('Error updating cart', 'Close', {

      })
    })
  }
}))
}
  carts=signal<ShoppingCartModel[]>([])
  displayedColumns: string[] = ["title", "dataAcquisto","note", "totale","fornitore"];
  ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
  }
  async ngOnInit(): Promise<void> {

    const user = await this.users.getLoggedUser()
  this.service.getCarts4UserOnValue(user.key, (carts) => {
    this.carts.set(carts)
  })
  }

  async fetchSeller(sellerKey: string) {
    if (!sellerKey)
      return ""
    else{
    const seller = await this.Sellers.fetchSeller(sellerKey)
    return seller.nome}
  }

}
