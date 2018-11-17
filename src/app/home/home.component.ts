import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Web3Service } from '../util/web3.service';
import value from '*.json';
import { TravelsContractService, Travel } from '../util/travels-contract.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Travels: any;

  constructor(private travels: TravelsContractService, private router: Router) { }

  goToSearchTravelList() {
    this.router.navigate(['search-travel']);
  }

  ngOnInit() {
  }
}


