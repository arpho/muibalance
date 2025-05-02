import { MatIconModule } from '@angular/material/icon';
import { Component, model, OnInit,  } from '@angular/core';
import { SellerViewerComponent } from '../../sellerViewer/sellerViewer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-seller-selector',
  imports: [
    SellerViewerComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './seller-selector.component.html',
  styleUrl: './seller-selector.component.css',
  standalone: true
})
export class SellerSelectorComponent  implements OnInit {
createDialog() {
throw new Error('Method not implemented.');
}
openDialog() {
console.log("openDialog")
}
ngOnInit(): void {
console.log("sellerKey",this.sellerKey())
}
sellerKey = model('')


}
