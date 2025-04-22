import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ShoppingCartService } from '../../services/shoppingCarts/shopping-cart.service';
import { UsersService } from '../../services/users/users.service';
import { ShoppingCartModel } from '../../models/shoppingCartModel';
import { SellersService } from '../../services/suppliers/suppliers.service';
import { SellerViewerComponent } from "../sellerViewer/sellerViewer.component";

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl:'./shoppingCartList.component.html' ,
  styleUrl: './shoppingCartList.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatTableModule, SellerViewerComponent]
})
export class ShoppingCartListComponent implements OnInit {
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
