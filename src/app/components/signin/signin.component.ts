import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserModel } from '../../models/userModel';

@Component({
  selector: 'app-signup',
  imports: [    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule,
    FormsModule,],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  standalone: true
})
export class SignupComponent {
submit() {
const user= new UserModel({
  email: this.email,
  password: this.password,
  firstName: this.firstName,
  lastName: this.lastName
})
console.log("user",user)
}

  email: string = '';
  password: string = '';
  error: boolean = false;
  errorMessage: string = '';
  firstName: string = '';
  lastName: string = '';

}
