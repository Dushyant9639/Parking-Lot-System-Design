"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Slot_1 = __importDefault(require("./Slot"));
class Floor {
    constructor(id) {
        this.id = id;
        this.slots = [];
    }
    addSlot(vehicleType) {
        this.slots.push(new Slot_1.default(this.slots.length + 1, vehicleType, this.id));
    }
    getAvailableSlots(vehicleType) {
        let availableSlots = [];
        for (const slot of this.slots) {
            if (slot.isOccupied) {
                continue;
            }
            if (!vehicleType) {
                availableSlots.push(slot);
            }
            else if (slot.type === vehicleType) {
                availableSlots.push(slot);
            }
        }
        return availableSlots;
    }
    getOccupiedSlots(vehicleType) {
        let occupiedSlots = [];
        for (const slot of this.slots) {
            if (!slot.isOccupied) {
                continue;
            }
            if (!vehicleType) {
                occupiedSlots.push(slot);
            }
            else if (slot.type === vehicleType) {
                occupiedSlots.push(slot);
            }
        }
        return occupiedSlots;
    }
}
exports.default = Floor;
