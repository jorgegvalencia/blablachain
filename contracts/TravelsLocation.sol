// solium-disable linebreak-style
pragma solidity ^0.4.24;

import "./TravelsContract.sol";

contract TravelsLocation is TravelsContract{

    Travel[] private travels;

  
    modifier onlyDriver(address _driverAdrress) {
        require(msg.sender == _driverAdrress, "No driver Address");
        _;
    }

    modifier onlyPassengers(address _passengerAdrress){
        require(msg.sender == _passengerAdrress, "No driver Address");
        _;
    }
    modifier samePlace(string travelPlace, string userPlace){
        require(keccak256(travelPlace) == keccak256(userPlace), "No driver Address");
        _;
    }

    function initTravelLocation(uint travelId, string locationDriver) public samePlace(travels[travelId].from, locationDriver) {
        initTravel(travelId);
    }
  
    function finishTravelLocation(uint travelId, string locationDriver) public samePlace(travels[travelId].to, locationDriver){
        finishTravel(travelId);
    }

    function makeReportLocation(uint travelId, uint passenger,string passengerLocation) public
    samePlace(travels[travelId].from, passengerLocation){
        makeReport(travelId, passenger);
    }
}