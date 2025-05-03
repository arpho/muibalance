import { SellerViewerComponent } from './../../sellerViewer/sellerViewer.component';
import { Component, inject, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { SellersService } from '../../../services/suppliers/suppliers.service';
import { SellerModel } from '../../../models/supplierModel';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatTableModule } from '@angular/material/table';
import { GelocationService } from '../../../services/geolocation/gelocation.service';
import { DistanceSorterPipe } from '../../../pipes/sorterPipes/distance-sorter.pipe';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { FilterPipe } from '../../../pipes/filterPipe/filter-pipe.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bottom-seller-selector',
  imports: [
    MatTableModule,
    SellerViewerComponent,
    DistanceSorterPipe,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    FilterPipe,
    MatFormField,
    MatLabel
  ],
  templateUrl: './bottom-seller-selector.component.html',
  styleUrl: './bottom-seller-selector.component.css',
  standalone: true
})
export class BottomSellerSelectorComponent  implements OnInit, OnDestroy{
selectSeller(seller: SellerModel) {
console.log("selected",seller)
this.sellerKey.set(seller.key)
this.MatBottomSheetRef.dismiss(this.sellerKey())
}
  sellers = signal<SellerModel[]>([])
  subscriptions: Subscription = new Subscription()
  displayedColumns: string[] = ['nome', 'rootSeller'];

  coords = signal<{latitude:number,longitude:number}>({latitude:0,longitude:0})

  sellerKey = signal('')
    readonly data = inject<{sellerKey:string}>(MAT_BOTTOM_SHEET_DATA)
      readonly MatBottomSheetRef = inject(MatBottomSheetRef)
  form: any;
  filterSeller =""
  filter: (seller: SellerModel) => boolean = (seller: SellerModel) => true
  async ngOnInit() {
    const loggedUser = await this.users.getLoggedUser()
    this.subscriptions.add(this.form.get("filterSeller")?.valueChanges.subscribe((value:string)=>{

      this.filter = (seller:SellerModel)=>seller.nome.toLowerCase().includes(value.toLowerCase())
    }))
this.Sellers.getSuppliers4UserOnValue(loggedUser.key,(sellers)=>{
  this.sellers.set(sellers)
   this.geolocation.getCurrentPosition().subscribe(position=>{
     this.coords.set({latitude:position.coords.latitude,longitude:position.coords.longitude})
   })

})
  }

  constructor(
    private users:UsersService,
    private Sellers:SellersService,
    private geolocation:GelocationService,
    private fb:FormBuilder

  ) {
    this.sellerKey.set(this.data.sellerKey )
    this.form = this.fb.group({filterSeller: ''})
   }
  ngOnDestroy(): void {
   this.subscriptions.unsubscribe()
  }

}
