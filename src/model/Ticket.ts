import { ITicket, IVehicle } from "../types";

class Ticket implements ITicket{
    id: string;
    vehicle: IVehicle;
    entryTime: number;
    constructor(id: string, vehicle: IVehicle, entryTime: number) {
        this.id = id;
        this.vehicle = vehicle;
        this.entryTime = entryTime;
    }
}

export default Ticket;