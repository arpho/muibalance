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
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { limit } from '@angular/fire/firestore';
import { FilterPipe } from '../../pipes/filterPipe/filter-pipe.pipe';
import { MatInputModule } from '@angular/material/input';

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
    MyMenuComponent,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    FilterPipe
  ]
})
export class ShoppingCartListComponent implements OnInit,OnDestroy {
timeFilterLimit= 7
fullText = ''
filterForm:FormGroup = new FormGroup({})
  timeFilterFunction: (date: ShoppingCartModel) => boolean = (date: ShoppingCartModel) => {return true}
  fullTextFilterFunction: (date: ShoppingCartModel) => boolean = (date: ShoppingCartModel) => {return true}
  filterFunction : (date: ShoppingCartModel) => boolean = (cart: ShoppingCartModel) => {return this.timeFilterFunction(cart) && this.fullTextFilterFunction(cart)}
[x: string]: any;
deleteItem(cart: ShoppingCartModel) {
const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  data: {
    title:"Delete Cart",
    message:"Are you sure you want to delete this cart?"
  }
})
this.subscriptions.add(dialogRef.afterClosed().subscribe(res=>{
  if(res){
console.log("cart to be deleted",cart)
this.service.deleteCart(cart).then(res=>{
this.snackBar.open('Cart deleted successfully', 'Close', {
})

}).catch(err=>{
  console.error(err)
  this.snackBar.open('Error deleting cart', 'Close', {
  })
})
  }
}))
}
updateItem(cart: ShoppingCartModel) {
  this.seeCart(cart)
}

fullTextFilterFactory(text:string): (cart: ShoppingCartModel) => boolean {
  console.log("text 2 search",text)
  const out = (cart:ShoppingCartModel)=>{
    return cart.fullText.toLowerCase().includes(text.toLowerCase())
  }
  return out
}
timeFilterFactory(limit:number): (cart: ShoppingCartModel) => boolean {
  const now = new Date()

  const sec = 1000
  const min = 60*sec
  const hour = 60*min
  const day = 24*hour
  const out = (cart:ShoppingCartModel)=>{
    const timeLimit = day*limit
    const diff = now.getTime() - new Date( cart.buyngDate).getTime()
    return diff < timeLimit
  }
  return out


}
  constructor (
    private users:UsersService,
    private service:ShoppingCartService,
    private Sellers:SellersService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    private fb:FormBuilder
  ) {
this.fullText = ''
this.filterForm = new FormGroup({
  limit: this.fb.control(this.timeFilterLimit),
  fullText: this.fb.control(this.fullText)
})
this.filterForm.valueChanges.subscribe(res=>{
  const fullText = res.fullText
  console.log("fullText",res)
this.timeFilterLimit = res.limit
console.log("timeFilterLimit",this.timeFilterLimit)
this.timeFilterFunction = this.timeFilterFactory(this.timeFilterLimit)
if(fullText){
  this.fullTextFilterFunction = this.fullTextFilterFactory(fullText.trim())
}
this.filterFunction = (cart: ShoppingCartModel) => {return this.timeFilterFunction(cart) && this.fullTextFilterFunction(cart)}
})
this.timeFilterFunction = this.timeFilterFactory(this.timeFilterLimit)
  }
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

    this.service.createCart(cart).then(res=>{
      console.log("created",res)
      this.snackBar.open('Cart created successfully', 'Close', {
        duration: 3000,
      })
    }).catch(err=>{
      console.error(err)
      this.snackBar.open('Error creating cart', 'Close', {
        duration: 3000,
      })
    })
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
