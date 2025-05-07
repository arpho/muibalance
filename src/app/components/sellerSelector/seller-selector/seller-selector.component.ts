import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, model, OnChanges, OnDestroy, OnInit, output, Output, SimpleChanges,  } from '@angular/core';
import { SellerViewerComponent } from '../../sellerViewer/sellerViewer.component';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { BottomSellerSelectorComponent } from '../../bottomSellerSelector/bottom-seller-selector/bottom-seller-selector.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ControlValueAccessor } from '@angular/forms';
import { SellerModel } from '../../../models/supplierModel';

@Component({
  selector: 'app-seller-selector',
  imports: [
    SellerViewerComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './seller-selector.component.html',
  styleUrl: './seller-selector.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SellerSelectorComponent  implements OnInit, OnDestroy,  ControlValueAccessor,OnChanges{
  subscriptions=new Subscription()
  @Output() sellerKeyChange =""
  selectedSeller  = output<string>( )
  sellerKey = model('')
  fnTouched = (value?: any) => {}
  fnchanged = (value?: any) => {}
  constructor(
    private dialog:MatDialog,
    private bottomSheet:MatBottomSheet,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
console.log("changes on seller viewer",changes)
this.sellerKey.set(changes['sellerKey'].currentValue)
  }
  writeValue(obj: any): void {
    this.sellerKey.set(obj)
  }
  registerOnChange(fn: any): void {
    this.fnchanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.fnTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
createDialog() {
throw new Error('Method  not implemented.');
}
openDialog() {
const dialogRef = this.bottomSheet.open(BottomSellerSelectorComponent, {
  data: { sellerKey: this.sellerKey(), buttonText: 'Select' },

})
this.subscriptions.add(dialogRef.afterDismissed().subscribe(res => {
  if (res) {
    const seller = new SellerModel({key:res})
    this.sellerKey.set(seller.key)
    console.log("selected",res)
    this.fnTouched(this.sellerKey())
    this.fnchanged(this.sellerKey())
    this.selectedSeller.emit(this.sellerKey())
  }
}))
}
ngOnInit(): void {
  console.log("sellerKey",this.sellerKey())
}


}
