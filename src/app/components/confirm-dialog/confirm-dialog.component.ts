import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {

}
