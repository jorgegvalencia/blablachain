// solium-disable linebreak-style
pragma solidity ^0.4.24;

contract TravelsContract {
  // Array pets owners
    uint public travelsCount;
    uint[] travelsId;
    Travel[] private travels;

    constructor() public {
        travelsCount = 0;
    }

    modifier onlyDriver(address _driverAdrress) {
        require(msg.sender == _driverAdrress, "No driver Address");
        _;
    }

    modifier onlyPassengers(address _passengerAdrress){
        require(msg.sender == _passengerAdrress, "No driver Address");
        _;
    }
    
  // Adopting pet function
    function setTravel(string from, string to, uint when, uint prize, uint passengers) public payable returns (uint){
        require(msg.value == 5 * passengers && passengers >= 1, "");
        travelsCount++;
        travels.push(
            Travel(travelsCount, from, to, when, prize, passengers, 1, 0, new address[](passengers+1), new address[](passengers+1), new address[](passengers+1), msg.sender, false, false));
        return travelsCount;
    }

    function getTravel(uint travelId) public view returns(string, string, uint, uint, uint){
        if(!travels[travelId].travelFinish){
            return(travels[travelId].from, 
            travels[travelId].to,
            travels[travelId].when,
            travels[travelId].numPassengers,
            travels[travelId].numPassengersReserved);
        }
        else {
            return("","",0,0, 0);
        }

    }

    function reserveTravel(uint travelId) public payable returns (uint){
        Travel travel = travels[travelId];
        require(msg.value == travel.prize/2 && travel.numPassengersReserved < travel.numPassengers, "");
        travel.numPassengersReserved++;
        travel.passengersAddress[travel.numPassengersReserved] = msg.sender;
        return travel.numPassengersReserved;
    }

    function makePayment(uint travelId, uint passenger) public
    onlyPassengers(travels[travelId].passengersAddress[passenger]) payable returns (uint) {
        Travel travel = travels[travelId];
        require(msg.value == travel.prize / 2, "");
        travel.passengersPayed.push(msg.sender);
        travel.numPassengersPayed++;
    }

    function initTravel(uint travelId) public onlyDriver(travels[travelId].driverAddress) {
        Travel travel = travels[travelId];
        require(now > travel.when + 15*60 || travel.numPassengersPayed == travel.numPassengersReserved, "");
        travel.travelStarted = true;
    }
  
    function finishTravel(uint travelId) public onlyDriver(travels[travelId].driverAddress) {
        Travel travel = travels[travelId];
        travel.travelFinish = true;
   
        for(uint i = 1; i<travel.numPassengersReserved + 1; i++){
            if(travel.passengersPayed[i] != 0){
                msg.sender.transfer(travel.prize);
            }
            else if(travel.travelReported[i] == 0){
                msg.sender.transfer(travel.prize/2);
            }
            else{
                msg.sender.transfer(5);
            }
        }
    }

    function makeReport(uint travelId, uint passenger) onlyPassengers(travels[travelId].passengersAddress[passenger]) public{
        Travel travel = travels[travelId];
        require(now >= travel.when + 15*60 && !travels[travelId].travelStarted, "");
        travel.travelReported.push(msg.sender);
    }

    function getPassenger(uint travelId) public view returns(uint){
        for(uint i = 1; i < travels[travelId].numPassengersReserved + 1; i++){
            if(travels[travelId].passengersAddress[i] == msg.sender){
                return i;
            } 
        }
        return 0;
    }

    struct Travel {
        uint id;
        string from;
        string to;
        uint when;
        uint prize;
        uint numPassengers;
        uint numPassengersReserved;
        uint numPassengersPayed;
        address[] passengersAddress;
        address[] passengersPayed;
        address[] travelReported;
        address driverAddress;
        bool travelStarted;
        bool travelFinish;
    }
}