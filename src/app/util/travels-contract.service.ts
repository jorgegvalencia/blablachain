import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

declare let require: any;
const travelsArtifact = require('../../../build/contracts/TravelsContract.json');

export interface Travel {
  id: number;
  origin: string;
  destination: string;
  travelDate: Date;
  price: number;
  passengers: number;
}
let account;
//= '0x4450D9c0B8B291233fac85Ccf4adffE3883640d6';

@Injectable({
  providedIn: 'root'
})
export class TravelsContractService {

  contract: Promise<any>;
  onContractLoad: Promise<any>;

  constructor(private web3Service: Web3Service) {
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      account = accounts[0];
    });
  }

  initContract() {
    this.onContractLoad = this.web3Service.artifactsToContract(travelsArtifact).then((instance) => {
      this.contract = instance.deployed();
      this.watchAccount();
    }).catch(() => {
      this.contract = Promise.reject();
    });
  }

  createTravel(travel: Travel, deposit: number) {
    return this.onContractLoad.then(() => {
      return this.contract.then(instance => {
        instance.setTravel.sendTransaction(
          travel.origin,
          travel.destination,
          new Date().getTime(),
          travel.price,
          travel.passengers,
          {
            from: account,
            value: this.web3Service.toWei(deposit * travel.passengers),
            gas: 3000000,
            nonce: new Date().getTime() + 100 // nonce to guapo que sea mayor que el anterior
          });
      });
    });
  }

  getTravel(idTravel) {
    return this.onContractLoad.then(() => {
      return this.contract.then(instance => {
        return instance.getTravel.call(idTravel, {
          from: account
        });
      });
    });
  }

  getTravelsNumber() {
    return this.onContractLoad.then(() => {
      return this.contract.then(instance => {
        return instance.travelsCount.call();
      });
    });
  }

  reserveTravel(travel) {
    return this.onContractLoad.then(() => {
      return this.contract.then(instance => {
        instance.reserveTravel.sendTransaction(
          travel.id,
          {
            from: account,
            value: this.web3Service.toWei(travel.price / 2),
            gas: 3000000,
            nonce: new Date().getTime() + 100 // nonce to guapo que sea mayor que el anterior
          });
      });
    });
  }

  mapTravelToObject(travel) {
    return {
      id: travel[0].toNumber() - 1,
      origin: travel[1],
      destination: travel[2],
      travelDate: travel[3].toNumber(), // this.web3Service.toEther
      price: travel[4].toNumber(),
      passengers: travel[5].toNumber()
    };
  }

}
