import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';

import { UserModel } from '../../models/userModel';
import { UsersService } from '../../services/users/users.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  //prettier-ignore
  imports: [
     MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
  ],
    providers: [provideNativeDateAdapter()],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  standalone: true
})
export class SignupComponent {
birthDate:string|number = new Date().toISOString().slice(0, 10);

  email: string = '';
  password: string = '';
  error: boolean = false;
  errorMessage: string = '';
  firstName: string = '';
  lastName: string = '';
  confirmPassword: string = '';
userName: string = '';

constructor(
  private Userservice:UsersService,
  private $snackBar: MatSnackBar
) {}
submit() {
const user= new UserModel({
  email: this.email,
  password: this.password,
  firstName: this.firstName,
  lastName: this.lastName,
  userName: this.userName,
  birthDate: new Date(this.birthDate).toISOString().slice(0, 10),
})
console.log("user",user)
UsersService
this.Userservice.signupUser(user).then(() => {
  this.$snackBar.open('User created successfully', 'Close', {
    duration: 3000,
  })
}).catch((error) => {
  this.$snackBar.open('Error creating user', 'Close', {
    duration: 3000,
  })
  console.error(error)
})
}
}
