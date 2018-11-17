// solium-disable linebreak-style
pragma solidity ^0.4.24;

contract TravelsValoracion {
  // Array pets owners
    uint public travelsCount;
    uint[] travelsId;
    Travel[] private travels;
    Driver[] private drivers;
    Passenger[] private passengers;
    uint numberDrivers = 0;

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
    function setTravel(string from, string to, uint when, uint prize, uint passengers,string matricula) public payable returns (uint){
        require(msg.value == 5 * passengers && passengers >= 1, "");
        uint valoracion;
        uint numberValoraciones;
        uint id;
        (id,valoracion,numberValoraciones) = getDriverValoration(msg.sender, matricula);
        require(valoracion!=0, "");
        travelsCount++;
        travels.push(
            Travel(travelsCount, from, to, when, prize, passengers, 1, 0, new Passenger[](passengers+1), new Passenger[](passengers+1), new Passenger[](passengers + 1), Driver(id, msg.sender, matricula, valoracion, numberValoraciones), false, false));
        return travelsCount;
    }

    function getDriverValoration(address driverAddress, string matricula) private view returns(uint256, uint256, uint256){
        string  matriculaAux;
        for(uint i = 0; i < drivers.length; i++){
            matriculaAux  =  drivers[i].matricula;
            if(drivers[i].driverAddress == driverAddress && keccak256(matricula) == keccak256(matriculaAux)){
                return(drivers[i].id, drivers[i].valoracion, drivers[i].numberValorations);
            }
        }
        return (0,0,drivers[i].numberValorations);
    }

    function setDriver(string matricula) public {
        Driver(numberDrivers,msg.sender,matricula,3,0);
        numberDrivers++;

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
            return("", "", 0, 0, 0);
        }

    }

    function reserveTravel(uint travelId) public payable returns (uint){
        Travel travel = travels[travelId];
        require(msg.value == travel.prize/2 && travel.numPassengersReserved < travel.numPassengers, "");
        travel.numPassengersReserved++;
        travel.passengersAddress[travel.numPassengersReserved] = Passenger(msg.sender,1);
        return travel.numPassengersReserved;
    }

    function makePayment(uint travelId, uint passenger) public
    onlyPassengers(travels[travelId].passengersAddress[passenger].passengerAddress) payable  {
        Travel travel = travels[travelId];
        require(msg.value == travel.prize / 2, "");
        travel.passengersPayed[passenger] = Passenger(msg.sender,1);
        travel.numPassengersPayed++;
    }

    function initTravel(uint travelId) public onlyDriver(travels[travelId].driver.driverAddress) {
        Travel travel = travels[travelId];
        require(now > travel.when + 15*60 || travel.numPassengersPayed == travel.numPassengersReserved, "");
        travel.travelStarted = true;
    }
  
    function finishTravel(uint travelId) public onlyDriver(travels[travelId].driver.driverAddress) {
        Travel travel = travels[travelId];
        travel.travelFinish = true;
   
        for(uint i = 1; i<travel.numPassengersReserved + 1; i++){
            if(travel.passengersPayed[i].passengerAddress != 0){
                msg.sender.transfer(travel.prize);
            }
            else if(travel.travelReported[i].passengerAddress == 0){
                msg.sender.transfer(travel.prize/2);
            }
            else{
                msg.sender.transfer(5);
            }
        }
    }

    function makeValorationDriver(uint travelId, uint valoration) public{
        uint valorationOld = travels[travelId].driver.valoracion;
        uint valorationNew = valoration - valorationOld / travels[travelId].driver.numberValorations;
        if(valorationNew > 0){
            drivers[travels[travelId].driver.id].valoracion = uint(valorationNew);
            }else {
            drivers[travels[travelId].driver.id].valoracion = 0.1 ether;
            }

    }

    function makeReport(uint travelId, uint passenger) onlyPassengers(travels[travelId].passengersAddress[passenger].passengerAddress) public{
        Travel travel = travels[travelId];
        require(now >= travel.when + 15 * 60 && !travels[travelId].travelStarted, "");
        travel.travelReported[passenger] = Passenger(msg.sender,1);
    }

    function getPassenger(uint travelId) public view returns(uint){
        for(uint i = 1; i < travels[travelId].numPassengersReserved + 1; i++){
            if(travels[travelId].passengersAddress[i].passengerAddress == msg.sender){
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
        Passenger[] passengersAddress;
        Passenger[] passengersPayed;
        Passenger[] travelReported;
        Driver driver;
        bool travelStarted;
        bool travelFinish;
    }

    struct Driver{
        uint id;
        address driverAddress;
        string matricula;
        uint valoracion;
        uint numberValorations;
    }
    
    struct Passenger{
        address passengerAddress;
        uint valoracion;
    }
}