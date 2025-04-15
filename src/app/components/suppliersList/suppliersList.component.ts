import { UsersService } from './../../services/users/users.service';
import { Component, OnInit, signal } from '@angular/core';
import { SuppliersService } from '../../services/suppliers/suppliers.service';
import { SupplierModel } from '../../models/supplierModel';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-suppliersList',
  templateUrl: './suppliersList.component.html',
  styleUrls: ['./suppliersList.component.css'],
  standalone: true,
  imports: [MatTableModule],
})
export class SuppliersListComponent implements OnInit {
sellers= signal<SupplierModel[]>([])
displayedColumns: string[] = [ "nome", "indirizzo", "note"];
  constructor(private service:SuppliersService,
              private usersService:UsersService
  ) { }

  async ngOnInit(): Promise<void> {
    const user = await this.usersService.getLoggedUser();
    const sellers = await  this.service.getSuppliers4User(user.key)
    console.log("got sellers",sellers)
    this.sellers.set(sellers)

  }

}
