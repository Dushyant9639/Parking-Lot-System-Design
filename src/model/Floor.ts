import { IFloor, ISlot, VehicleType } from "../types";
import Slot from "./Slot";

class Floor implements IFloor {
  id: number;
  slots: ISlot[];
  constructor(id: number) {
    this.id = id;
    this.slots = [];
  }
  addSlot(vehicleType: VehicleType, isEVReserved = false): void {
    this.slots.push(
      new Slot(this.slots.length + 1, vehicleType, this.id, isEVReserved)
    );
  }
  getAvailableSlots(vehicleType?: VehicleType): ISlot[] {
    return this.slots.filter((slot) => {
      if (slot.isOccupied) return false;

      if (slot.isEVReserved && vehicleType !== VehicleType.EV_CAR) {
        return false;
      }

      if (vehicleType === VehicleType.EV_CAR) {
        return (
          slot.type === VehicleType.EV_CAR || slot.type === VehicleType.CAR
        );
      }

      return !vehicleType || slot.type === vehicleType;
    });
  }

  getOccupiedSlots(vehicleType?: VehicleType): Array<ISlot> {
    let occupiedSlots = [];

    for (const slot of this.slots) {
      if (!slot.isOccupied) {
        continue;
      }

      if (!vehicleType) {
        occupiedSlots.push(slot);
      } else if (slot.type === vehicleType) {
        occupiedSlots.push(slot);
      }
    }

    return occupiedSlots;
  }
}

export default Floor;
