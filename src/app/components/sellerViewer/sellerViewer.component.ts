import { Component, Input, OnInit, signal } from '@angular/core';
import { SellersService } from '../../services/suppliers/suppliers.service';
import { SellerModel } from '../../models/supplierModel';

@Component({
  selector: 'app-sellerViewer',
  templateUrl: './sellerViewer.component.html',
  styleUrls: ['./sellerViewer.component.css'],
  standalone: true
})
export class SellerViewerComponent implements OnInit {
  @Input({required: true}) sellerKey: string = ''
  seller=signal<SellerModel>(new SellerModel())

  constructor(private service:SellersService) { }

  async ngOnInit() {
    const seller = await this.service.fetchSeller(this.sellerKey)
    this.seller.set(seller)
  }

}
