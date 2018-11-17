import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import { TravelsContractService } from '../util/travels-contract.service';

@Component({
  selector: 'app-new-travel',
  templateUrl: './new-travel.component.html',
  styleUrls: ['./new-travel.component.css']
})
export class NewTravelComponent implements OnInit {

  model = {
    origin: null,
    destination: null,
    travelDate: null,
    price: null,
    passengers: null
  };

  constructor(private travels: TravelsContractService) { }

  ngOnInit() {

  }

  toggleNewTravel() {
    const travel = {
      origin: this.model.origin,
      destination: this.model.destination,
      travelDate: new Date().getTime(),
      price: this.model.price,
      passengers: this.model.passengers
    };
    this.travels.createTravel(travel, Math.round(travel.price * 0.3))
      .catch(err => {
        console.error(err);
      });
  }

}
