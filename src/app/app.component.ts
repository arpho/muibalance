import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './services/users/users.service';
import { LoginComponent } from "./components/login/login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private user:UsersService) {


  }
  title = 'muibalance';
  async ngOnInit() {
  console.log("ciao")
  const user = await this.user.getLoggedUser();
  console.log("user",user)
}
}
