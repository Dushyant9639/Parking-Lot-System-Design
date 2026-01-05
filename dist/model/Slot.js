"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            throw new Error("Already free");
        }
        this.isOccupied = false;
    }
}
exports.default = Slot;
