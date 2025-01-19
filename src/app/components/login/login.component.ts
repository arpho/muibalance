import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { user } from '@angular/fire/auth';
@Component({
  selector: 'app-login',
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent  implements OnInit {
login() {
console.log(this.ngForm.value);
}
ngForm:FormGroup
year="2025";
userName="";
password= "";
  ngOnInit(): void {
console.log("login");

  }
  constructor(
    private fb:FormBuilder
  ){
    this.ngForm = this.fb .group({
      userName: new FormControl(this.userName),
      password: new FormControl(this.password)
     })
  }

}
