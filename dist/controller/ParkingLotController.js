"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingLotController = void 0;
const ParkingLot_1 = __importDefault(require("../model/ParkingLot"));
const RandomParkingStrategy_1 = __importDefault(require("../model/RandomParkingStrategy"));
const Vehicle_1 = __importDefault(require("../model/Vehicle"));
const types_1 = require("../types");
class ParkingLotController {
    createParkingLot(id, totalFloors, totalSlots) {
        if (this.parkingLot) {
            throw new Error("ParkingLot already Exists");
        }
        this.parkingLot = new ParkingLot_1.default(id, new RandomParkingStrategy_1.default);
        this.parkingLot.addFloors(totalFloors);
        const floors = this.parkingLot.floors;
        floors.forEach((floor) => {
            for (let index = 0; index < totalSlots; index++) {
                const vehicleType = index === 0 ? types_1.VehicleType.Truck : index <= 2 ? types_1.VehicleType.BIKE : types_1.VehicleType.Car;
                floor.addSlot(vehicleType);
            }
        });
        return `Created parking lot ${totalFloors} floors and ${totalSlots} slots per floor`;
    }
    parkVehicle(vType, regNo, color) {
        const vehicleType = types_1.VehicleType[vType];
        const vehicle = new Vehicle_1.default(vehicleType, regNo, color);
        const ticket = this.parkingLot.parkVehicle(vehicle);
        if (ticket) {
            // this.tickets.push(ticket);
            return `Parked vehicle. Ticket ID: ${ticket.id}`;
        }
        return "Parking Lot Full";
    }
    unparkVehicle(ticketId) {
        return this.parkingLot.unParkVehicle(ticketId);
    }
    display(displayType, vType) {
        // console.log(displayType, vType);
        const vehicleType = types_1.VehicleType[vType];
        // console.log(vehicleType);
        let data;
        switch (displayType) {
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
            });
        }
        return resp;
    }
}
exports.ParkingLotController = ParkingLotController;
function printSlotsData(displayType, vehicleType, floor, slotsOrCount) {
    switch (displayType) {
        case 'free_slots':
            return `No. of free slots for ${vehicleType} on Floor ${floor}: ${slotsOrCount.map(slot => slot.id)}`;
        case 'free_count':
            return `Free slots for ${vehicleType} on Floor ${floor}: ${slotsOrCount}`;
        case 'occupied_slots':
            return `Occupied slots for ${vehicleType} on Floor ${floor}: ${slotsOrCount.map(slot => slot.id)}`;
    }
}
