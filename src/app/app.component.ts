import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelsContractService } from './util/travels-contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private travels: TravelsContractService) {
  }

  ngOnInit() {
    this.travels.initContract();
  }

  goToFindTravel() {
    this.router.navigate(['home']);
  }

  goToNewTravel() {
    this.router.navigate(['new-travel']);
  }

  goToSearchMyTravels() {
    this.router.navigate(['my-travel']);
  }
}
