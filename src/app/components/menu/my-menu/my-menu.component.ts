import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-my-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './my-menu.component.html',
  styleUrl: './my-menu.component.css'
})
export class MyMenuComponent {

  menuItems: MenuItem[] = [
    { title: 'Categorie' , icon: 'categories.png', link: '/categories-list' },
    { title: 'Fornitori' , icon: 'seller.png', link: '/suppliers-list' },
    { title: 'Pagamenti' , icon: 'payment.png', link: '/payments-list' },
    { title: 'Carrelli' , icon: 'cart.png', link: '/shoppingCart-list' },

  ]
showMenu() {
console.log("menu")
}

}
