import { UsersService } from './../../services/users/users.service';
import { Component, OnInit, signal } from '@angular/core';
import { SuppliersService } from '../../services/suppliers/suppliers.service';
import { SupplierModel } from '../../models/supplierModel';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
@Component({
  selector: 'app-suppliersList',
  templateUrl: './suppliersList.component.html',
  styleUrls: ['./suppliersList.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatProgressBarModule
  ],
})
export class SuppliersListComponent implements OnInit {
  progress=signal(0)
async importSuppliers2firestore() {

const user = await this.usersService.getLoggedUser();
const sellers = await this.service.fetchSuppliers4userFromDb(user.key)
console.log("ready 2 upload")
sellers.forEach(seller=>{
  seller.userKey = user.key
  let count =0
  this.service.pushIntoCollection(seller).then(res=>{
    console.log("pushed",seller)
    count++
    this.progress .set((count/sellers.length)*100)
  }).catch(err=>{
    console.log("err on",seller)
    console.log(err)})
})
}
sellers= signal<SupplierModel[]>([])
displayedColumns: string[] = [ "nome", "indirizzo", "note"];
  constructor(private service:SuppliersService,
              private usersService:UsersService,
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
