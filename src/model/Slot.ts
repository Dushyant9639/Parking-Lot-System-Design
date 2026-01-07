import { ISlot, VehicleType } from "../types";

class Slot implements ISlot {
    id: number;
    type: VehicleType;
    isOccupied: boolean;
    isEVReserved: boolean; 
    floorId: number;

    constructor(id: number, type: VehicleType, floorId: number, isEVReserved = false) {
        this.id = id;
        this.type = type;
        this.isOccupied = false;
        this.isEVReserved = isEVReserved;
        this.floorId = floorId;
    }

    occupy(){
        if(this.isOccupied){
            throw new Error("Already Occupied");
        } 
        this.isOccupied = true;
    }

    release(){
        if(!this.isOccupied){
            throw new Error("Already free");
        }

        this.isOccupied = false;
    }
}

export default Slot;