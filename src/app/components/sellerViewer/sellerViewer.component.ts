import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { SellersService } from '../../services/suppliers/suppliers.service';
import { SellerModel } from '../../models/supplierModel';

@Component({
  selector: 'app-sellerViewer',
  templateUrl: './sellerViewer.component.html',
  styleUrls: ['./sellerViewer.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SellerViewerComponent implements  OnChanges {
  @Input({required: true}) sellerKey: string = ''
  seller=signal<SellerModel>(new SellerModel())

  constructor(private service:SellersService) { }
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
 if(changes['sellerKey'].currentValue)
  {
    const seller = await this.service.fetchSeller(changes['sellerKey'].currentValue)
    this.seller.set(seller)

  }
}

/*   async ngOnInit() {
    if(this.sellerKey)
    {
      const seller = await this.service.fetchSeller(this.sellerKey)
      this.seller.set(seller)
  }
  else{
    this.seller.set(new SellerModel({}))
  }
  } */

}
