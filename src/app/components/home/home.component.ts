import { Component, OnInit } from '@angular/core';
import { SectionCardComponent } from "../section-card/section-card.component";
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    SectionCardComponent,
    MatGridListModule
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
