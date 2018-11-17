import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { TravelsContractService } from '../util/travels-contract.service';

@Component({
  selector: 'app-search-travel-list',
  templateUrl: './search-travel-list.component.html',
  styleUrls: ['./search-travel-list.component.css']
})
export class SearchTravelListComponent {

  travelsList = [];

  constructor(private travels: TravelsContractService) {}

  ngOnInit() {
    this.getTravels().then(res => {
      this.travelsList = res;
    });
  }

  getTravels() {
    const idTravel = 0;
    const travels = this.travels;
    return travels.getTravelsNumber().then((count) => {
      const promises = [];
      for (let i = 0; i < count; i++) {
        promises.push(travels.getTravel(idTravel));
      }
      return Promise.all(promises).then((results) => {
        return results.map(res => {
          console.log(res);
          return travels.mapTravelToObject(res);
        });
      });
    });
  }

  reserveTravel(travel) {
    this.travels.reserveTravel(travel).then(res => {
      console.log(res);
    });
  }

}
