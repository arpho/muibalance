import { UsersService } from './../../services/users/users.service';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SellersService } from '../../services/suppliers/suppliers.service';
import { SellerModel } from '../../models/supplierModel';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SellerDialogComponent } from '../sellerDialog/seller-dialog/seller-dialog.component';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar'
@Component({
  selector: 'app-suppliersList',
  templateUrl: './suppliersList.component.html',
  styleUrls: ['./suppliersList.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
     MatTableModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatSnackBarModule,
        MatProgressBarModule,
        MatIcon,
        MatToolbarModule
  ],
})
export class SuppliersListComponent implements OnInit,OnDestroy {
createSupplier() {
console.log("createSupplier")
const newSeller = new SellerModel()
const dialogRef = this.dialog.open(SellerDialogComponent,{
  data:{data:newSeller,buttonText:"Crea fornitore"},
  height:"80%",
  width:"90%"
})
this.subscriptions.add(dialogRef.afterClosed().subscribe(res=>{
  if(res){
    console.log("res for created supplier ",res)
    this.service.createSupplier(res).then(res=>{
      console.log("created",res)
      this.snackBar.open('Supplier created successfully', 'Close', {
        duration: 3000,
      })
    }).catch(err=>{
      console.error(err)
      this.snackBar.open('Error creating supplier', 'Close', {
        duration: 3000,
      })
    })
}
}))
}
  subscriptions = new Subscription()
updateSeller(seller: SellerModel) {
console.log("updateSeller",seller)

const dialogRef = this.dialog.open(SellerDialogComponent,{
  data:{data:seller,buttonText:"Update"},
height:"80%",
width:"90%"}


)
  this.subscriptions.add(dialogRef.afterClosed().subscribe(res=>{
    if(res){
      seller.build(res)
      console.log("res for updated seller ",seller)
      this.service.updateSupplier(seller).then(res=>{
        console.log("updated",res)
        this.snackBar.open('Supplier updated successfully', 'Close', {
          duration: 3000,
        })
      }).catch(err=>{
        console.error(err)
        this.snackBar.open('Error updating supplier', 'Close', {
          duration: 3000,
        })
      })
  }
  }))
}
  progress=signal(0)
async importSuppliers2firestore() {

const user = await this.usersService.getLoggedUser();
const sellers = await this.service.fetchSuppliers4userFromDb(user.key)
console.log("ready 2 upload")
let count=0
sellers.forEach(seller=>{
  seller.userKey = user.key

  this.service.pushIntoCollection(seller).then(res=>{
    console.log("pushed",seller)
    count++
    this.progress .set((count/sellers.length)*100)
  }).catch(err=>{
    console.log("err on",seller)
    console.log(err)})
})
this.snackBar.open(`${count} suppliers imported successfully`, 'Close', {
  duration: 3000,
})
}
sellers= signal<SellerModel[]>([])
displayedColumns: string[] = [ "nome", "indirizzo", "note"];
  constructor(private service:SellersService,
              private usersService:UsersService,
              private dialog:MatDialog,
              private snackBar:MatSnackBar
  ) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  async ngOnInit(): Promise<void> {
    const user = await this.usersService.getLoggedUser();
    const sellers = await  this.service.getSuppliers4User(user.key)
    console.log("got sellers",sellers)
    this.sellers.set(sellers)
    sellers.forEach(seller=>{
      if(!seller.nome)
        console.log("seller with no name",seller)
    })

  }

}
