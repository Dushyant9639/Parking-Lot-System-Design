"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingLot = void 0;
const TicketController_1 = __importDefault(require("../controller/TicketController"));
const Floor_1 = __importDefault(require("./Floor"));
class ParkingLot {
    constructor(id, parkingStrategy) {
        this.id = id;
        this.parkingStrategy = parkingStrategy;
        this.floors = [];
    }
    addFloors(floorsToAdd) {
        for (let i = 0; i < floorsToAdd; i++) {
            this.floors.push(new Floor_1.default(i));
        }
    }
    setParkingStrategy(parkingStrategy) {
        this.parkingStrategy = parkingStrategy;
    }
    parkVehicle(vehicle) {
        const slotToBook = this.parkingStrategy.park(this.floors, vehicle);
        if (slotToBook) {
            // occupy the slot
            slotToBook.occupy();
            // generate ticket
            const ticket = TicketController_1.default.generateTicket(this.id, slotToBook.id, slotToBook.floorId, vehicle);
            return ticket;
        }
        throw new Error("No slots available");
    }
    getFreeSlots(vehicleType, showSlots = false) {
        const floors = this.floors;
        const freeSlots = {};
        floors.forEach(floor => {
            const availableSlots = floor.getAvailableSlots(vehicleType);
            // console.log({ availableSlots });
            freeSlots[floor.id] = showSlots ? availableSlots : availableSlots.length;
        });
        // console.log({ freeSlots });
        return freeSlots;
    }
    getOccupiedSlots(vehicleType) {
        const floors = this.floors;
        const occupiedSlots = {};
        floors.forEach(floor => {
            occupiedSlots[floor.id] = floor.getOccupiedSlots(vehicleType);
        });
        return occupiedSlots;
    }
    unParkVehicle(ticketId) {
        const ticket = TicketController_1.default.getTicketWithId(ticketId);
        if (ticket) {
            const [parkingLotId, floorId, slotId] = ticketId.split('_');
            const floor = this.floors[Number(floorId) - 1];
            const slot = floor.slots[Number(slotId) - 1];
            slot.release();
            TicketController_1.default.deleteTicket(ticketId);
            return `Unparked Vehicle with Registration No: ${ticket.vehicle.regNo} and Color: ${ticket.vehicle.color}`;
        }
        throw new Error("Invalid Ticket!!");
    }
}
exports.ParkingLot = ParkingLot;
exports.default = ParkingLot;
