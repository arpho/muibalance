import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ShoppingCartService } from '../../services/shoppingCarts/shopping-cart.service';
import { UsersService } from '../../services/users/users.service';
import { ShoppingCartModel } from '../../models/shoppingCartModel';
import { SellersService } from '../../services/suppliers/suppliers.service';
import { SellerViewerComponent } from "../sellerViewer/sellerViewer.component";
import { MySorterPipePipe } from "../../pipes/mySorterPipe.pipe";
import { MatButtonModule } from '@angular/material/button';
import { count } from 'rxjs';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl:'./shoppingCartList.component.html' ,
  styleUrl: './shoppingCartList.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatTableModule, SellerViewerComponent, MySorterPipePipe,
        MatButtonModule,
  ]
})
export class ShoppingCartListComponent implements OnInit {
  async uploadCarts2firestore() {
console.log("uploadCarts2firestore")
const carts = await this.service.getShoppingCartsFRomRealtimeDb((await this.users.getLoggedUser()).key)
console.log("carts",carts)
const userKey = (await this.users.getLoggedUser()).key
let count=0
carts.forEach(cart=>{
  cart.userKey = userKey
  this.service.pushCart2firestore(cart).then(res=>{
    console.log("pushed",cart)
    count++;
  }).catch(err=>{
    console.log("err on",cart)
    console.log(err)
  })
})
alert("carts pushed "+count)

}
seeCart(_t66: any) {
console.log("seeCart",_t66);
}
  carts=signal<ShoppingCartModel[]>([])
  displayedColumns: string[] = ["title", "dataAcquisto","note", "totale","fornitore"];
  constructor (
    private users:UsersService,
    private service:ShoppingCartService,
    private Sellers:SellersService
  ) { }
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
