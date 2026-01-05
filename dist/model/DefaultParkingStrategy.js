"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultParkingStrategy {
    park(floors, vehicle) {
        for (let floor of floors) {
            const [slotToBook] = floor.getAvailableSlots(vehicle.type);
            if (slotToBook) {
                return slotToBook;
            }
        }
        return null;
    }
}
exports.default = DefaultParkingStrategy;
