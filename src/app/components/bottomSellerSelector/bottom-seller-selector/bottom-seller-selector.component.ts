import { SellerViewerComponent } from './../../sellerViewer/sellerViewer.component';
import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { SellersService } from '../../../services/suppliers/suppliers.service';
import { SellerModel } from '../../../models/supplierModel';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-bottom-seller-selector',
  imports: [
    MatTableModule,
    SellerViewerComponent
  ],
  templateUrl: './bottom-seller-selector.component.html',
  styleUrl: './bottom-seller-selector.component.css',
  standalone: true
})
export class BottomSellerSelectorComponent  implements OnInit{
  sellers = signal<SellerModel[]>([])
  displayedColumns: string[] = ['nome', 'rootSeller'];
  sellerKey = signal('')
    readonly data = inject<{sellerKey:string}>(MAT_BOTTOM_SHEET_DATA)
  async ngOnInit() {
    const loggedUser = await this.users.getLoggedUser()
this.Sellers.getSuppliers4UserOnValue(loggedUser.key,(sellers)=>{
  this.sellers.set(sellers)
  console.log("got sellers",sellers)
})
  }

  constructor(
    private users:UsersService,
    private Sellers:SellersService,

  ) {
    console.log("data",this.data)
    this.sellerKey.set(this.data.sellerKey )
    console.log("sellerKey on bottom",this.sellerKey())
   }

}
