enum VehicleType {
    CAR = 'CAR',
    TRUCK = 'TRUCK',
    BIKE = 'BIKE'
}

interface IVehicle {
    type: VehicleType;
    regNo: string;
    color: string;
}

interface ISlot{
    id:number;
    type: VehicleType;
    isOccupied: boolean;
    floorId: number;
    occupy():void;
    release():void;
}

interface IFloor{
    id:number;
    slots:Array<ISlot>;
    addSlot(vehicleType:VehicleType):void;
    getAvailableSlots(vehicleType?:VehicleType):Array<ISlot>;
    getOccupiedSlots(vehicleType?:VehicleType):Array<ISlot>;
}

interface ITicket{
    id:string;
    vehicle:IVehicle
}

interface IParkingStrategy{
    park(floors:Array<IFloor>, vehicle:IVehicle):ISlot|null;
}

export {
    VehicleType,
    IVehicle,
    ISlot,
    IFloor,
    ITicket,
    IParkingStrategy};
//**
// Closest
// Random Parking */