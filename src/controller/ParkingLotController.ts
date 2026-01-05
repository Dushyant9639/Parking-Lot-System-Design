import DefaultParkingStrategy from "../model/DefaultParkingStrategy";
import ParkingLot from "../model/ParkingLot";
import RandomParkingStrategy from "../model/RandomParkingStrategy";
import Vehicle from "../model/Vehicle";
import { ISlot, VehicleType } from "../types";

export class ParkingLotController{
    parkingLot!:ParkingLot;
    createParkingLot(id:string, totalFloors:number, totalSlots:number){
        if(this.parkingLot){
            throw new Error("ParkingLot already Exists");
        }

        this.parkingLot = new ParkingLot(id, new DefaultParkingStrategy);

        this.parkingLot.addFloors(totalFloors);

        const floors = this.parkingLot.floors;

        floors.forEach((floor) => {
            for(let index=0; index<totalSlots; index++){
                const vehicleType = index === 0? VehicleType.TRUCK : index <=2 ? VehicleType.BIKE : VehicleType.CAR;

                floor.addSlot(vehicleType);
            }
        });

        return `Created parking lot ${totalFloors} floors and ${totalSlots} slots per floor`;
    }

    parkVehicle(vType: string, regNo: string, color: string) {
        const vehicleType = VehicleType[vType as keyof typeof VehicleType];
        const vehicle = new Vehicle(vehicleType, regNo, color);
        const ticket = this.parkingLot.parkVehicle(vehicle);
        if (ticket) {
            // this.tickets.push(ticket);
            return `Parked vehicle. Ticket ID: ${ticket.id}`;
        }
        return "Parking Lot Full";
    }

    unparkVehicle(ticketId: string) {
        return this.parkingLot.unParkVehicle(ticketId);
    }

    display(displayType: string, vType: string) {
        // console.log(displayType, vType);
        const vehicleType = VehicleType[vType as keyof typeof VehicleType];
        // console.log(vehicleType);
        let data;
        switch(displayType) {
            case 'free_slots':
            case 'free_count':
                data = this.parkingLot.getFreeSlots(vehicleType, displayType === 'free_slots');
                break;
            case 'occupied_slots':
                data = this.parkingLot.getOccupiedSlots(vehicleType);
                break;
        }

        let resp = '';
        if (data) {
            Object.entries(data).forEach(d => {
                const [floor, slotsOrCount] = d;
                resp += printSlotsData(displayType, vehicleType, floor, slotsOrCount) + '\n';
            })
        }
        return resp;
    }
    
}

function printSlotsData(displayType: string, vehicleType: string, floor: string, slotsOrCount?: Array<ISlot> | number) {
    switch(displayType) {
        case 'free_slots' :
            return `No. of free slots for ${vehicleType} on Floor ${floor}: ${(slotsOrCount as Array<ISlot>).map(slot => slot.id)}`;
        case 'free_count' :
            return `Free slots for ${vehicleType} on Floor ${floor}: ${slotsOrCount}`;
        case 'occupied_slots' :
            return `Occupied slots for ${vehicleType} on Floor ${floor}: ${(slotsOrCount as Array<ISlot>).map(slot => slot.id)}`;
    }
}
