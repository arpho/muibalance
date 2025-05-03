import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Component, Input, model, OnDestroy, OnInit,  } from '@angular/core';
import { SellerViewerComponent } from '../../sellerViewer/sellerViewer.component';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { BottomSellerSelectorComponent } from '../../bottomSellerSelector/bottom-seller-selector/bottom-seller-selector.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

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
export class SellerSelectorComponent  implements OnInit, OnDestroy {
  subscriptions=new Subscription()
  sellerKey = model('')
  constructor(
    private dialog:MatDialog,
    private bottomSheet:MatBottomSheet,
  ) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
createDialog() {
throw new Error('Method  not implemented.');
}
openDialog() {
console.log("openDialog",this.sellerKey())
const dialogRef = this.bottomSheet.open(BottomSellerSelectorComponent, {
  data: { sellerKey: this.sellerKey(), buttonText: 'Select' },

})
}
ngOnInit(): void {
console.log("sellerKey",this.sellerKey())
}


}
