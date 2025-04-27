import { UsersService } from './../../services/users/users.service';
import { Component, OnInit, signal } from '@angular/core';
import { SellersService } from '../../services/suppliers/suppliers.service';
import { SellerModel } from '../../models/supplierModel';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SellerDialogComponent } from '../sellerDialog/seller-dialog/seller-dialog.component';
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
        MatProgressBarModule
  ],
})
export class SuppliersListComponent implements OnInit {
updateSeller(seller: SellerModel) {
console.log("updateSeller",seller)
this.dialog.open(SellerDialogComponent,{
  data:{data:seller,buttonText:"Update"}})
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
