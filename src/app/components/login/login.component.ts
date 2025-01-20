import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
signup() {
  console.log("signup"  )
this.router.navigate(['signup']);
}
  user: any;
  email: string = '';
  password: string = '';
  error: boolean = false;
  errorMessage: string = '';

  constructor(public afAuth: AngularFireAuth, private cdr: ChangeDetectorRef, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      if (user) {
        console.log(this.user.email);
        console.log(this.user.displayName);
        console.log(this.user.photoURL);
        console.log(this.user.emailVerified);
        console.log(this.user.isAnonymous);
        console.log(this.user.uid);
        console.log(this.user.providerData);
        console.log(this.user.stsTokenManager);
        console.log(this.user.multiFactor);
        console.log(this.user.tenantId);
      }
    });
  }
  // constructor(public authService: AngularFireAuth) {
  //   this.authService.getAuthState().subscribe(user => {
  //     this.user = user;
  //   });
  // }

  login() {
    console.log('login');
    console.log(this.afAuth);
    this.afAuth
      .signInWithEmailAndPassword(this.email, this.password)
      .catch((error) => {
        console.log(error.message);
        this.error = true;
        this.errorMessage = error.message;
        this.cdr.detectChanges();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          this.error = false;
          this.errorMessage = '';
          window.location.reload();
        } else {
          console.log('login failed');
        }
        // window.location.reload();
      });
    //   this.authService.login(this.email, this.password).catch((error: any) => console.error(error));
    //  this.authService.login(this.email, this.password).catch(error => console.error(error));
  }



  logout() {
    this.afAuth.signOut().catch((error) => console.error(error));
  }

  ngOnInit(): void {}

  onSubmit(): void {
    // Handle form submission here
  }
}
