"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RandomParkingStrategy {
    park(floors, vehicle) {
        const availableSlots = [];
        floors.forEach((floor) => {
            const slots = floor.getAvailableSlots(vehicle.type);
            availableSlots.push(...slots);
        });
        if (availableSlots.length === 0) {
            return null;
        }
        const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
        return randomSlot;
    }
}
exports.default = RandomParkingStrategy;
