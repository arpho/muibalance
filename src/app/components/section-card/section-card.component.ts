import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-section-card',
  //prettier-ignore
  imports: [
    MatCardModule,
    MatButtonModule
    ],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.css'
})
export class SectionCardComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

go2Section() {
console.log("going to",this.url)
this.router.navigateByUrl(this.url);
}
matkeUrl() {
throw new Error('Method not implemented.');
}
  @Input({required: true}) title: string = '';
  @Input({required: true}) url: string = '';
  @Input({required: true}) picture: string = '';
  ngOnInit(): void {
console.log("url", this.url)
console.log("picture", this.picture)
console.log("title", this.title)
  }
}
