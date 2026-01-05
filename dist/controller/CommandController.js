"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandController {
    constructor(parkingLotController) {
        this.parkingLotController = parkingLotController;
    }
    executeCommand(command, ...args) {
        console.log('\nCOMMAND>>', command, args, '\n');
        const { parkingLotController } = this;
        switch (command) {
            case 'create_parking_lot':
                return parkingLotController.createParkingLot(...args);
            case 'park_vehicle':
                return parkingLotController.parkVehicle(...args);
            case 'unpark_vehicle':
                return parkingLotController.unparkVehicle(...args);
            case 'display':
                return parkingLotController.display(...args);
            default:
                return 'Invalid Command';
        }
    }
}
exports.default = CommandController;
