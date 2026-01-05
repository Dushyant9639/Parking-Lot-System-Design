"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
class Slot {
    constructor(id, type, floorId) {
        this.id = id;
        this.type = type;
        this.isOccupied = false;
        this.floorId = floorId;
    }
    occupy() {
        if (this.isOccupied) {
            throw new Error("Already Occupied");
        }
        this.isOccupied = true;
    }
    release() {
        if (!this.isOccupied) {
            throw new Error("Already release");
        }
        this.isOccupied = false;
    }
}
exports.Slot = Slot;
