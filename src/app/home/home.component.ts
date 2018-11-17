import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    tiles;

  constructor(private router: Router) { }

  ngOnInit() {
      this.tiles = [
          {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
          {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
          {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
          {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
      ];
  }

    goToSearchTravelList() {
        this.router.navigate(['search-travel']);
    }
}


