import TicketController from "../controller/TicketController";
import {
  IFloor,
  IParkingStrategy,
  ISlot,
  IVehicle,
  VehicleType,
} from "../types";
import Floor from "./Floor";
import { HOURLY_RATES } from "./ParkingRates";
import Ticket from "./Ticket";

export class ParkingLot {
  id: string;
  floors: Array<IFloor>;
  private parkingStrategy: IParkingStrategy;

  constructor(id: string, parkingStrategy: IParkingStrategy) {
    this.id = id;
    this.parkingStrategy = parkingStrategy;
    this.floors = [];
  }

  addFloors(floorsToAdd: number) {
    for (let i = 0; i < floorsToAdd; i++) {
      this.floors.push(new Floor(i));
    }
  }

  setParkingStrategy(parkingStrategy: IParkingStrategy) {
    this.parkingStrategy = parkingStrategy;
  }

  parkVehicle(vehicle: IVehicle) {
    const slotToBook = this.parkingStrategy.park(this.floors, vehicle);
    if (slotToBook) {
      // occupy the slot
      slotToBook.occupy();
      // generate ticket
      const ticket = TicketController.generateTicket(
        this.id,
        slotToBook.id,
        slotToBook.floorId,
        vehicle
      );

      return ticket;
    }

    throw new Error("No slots available");
  }

  getFreeSlots(vehicleType: VehicleType, showSlots: boolean = false) {
    const floors = this.floors;
    const freeSlots: { [x: string]: ISlot[] | number } = {};

    floors.forEach((floor) => {
      const availableSlots = floor.getAvailableSlots(vehicleType);
      // console.log({ availableSlots });
      freeSlots[floor.id] = showSlots ? availableSlots : availableSlots.length;
    });
    // console.log({ freeSlots });
    return freeSlots;
  }

  getOccupiedSlots(vehicleType: VehicleType) {
    const floors = this.floors;
    const occupiedSlots: { [x: string]: ISlot[] | number } = {};

    floors.forEach((floor) => {
      occupiedSlots[floor.id] = floor.getOccupiedSlots(vehicleType);
    });
    return occupiedSlots;
  }

  unParkVehicle(ticketId: string) {
    const ticket = TicketController.getTicketWithId(ticketId);

    if (!ticket) {
      return "Invalid Ticekt";
    }
    let exitTime = Date.now();
    let durationMs = exitTime - ticket.entryTime;
    let hours = Math.ceil(durationMs / (1000 * 60 * 60));
    let rate = HOURLY_RATES[ticket.vehicle.type];
    let amount = hours * rate;
    const [parkingLotId, floorId, slotId] = ticketId.split("_");

    const floor = this.floors[Number(floorId) - 1];
    const slot = floor.slots[Number(slotId) - 1];
    slot.release();
    TicketController.deleteTicket(ticketId);
    return `
            Vehicle Unparked Successfully
            ------------------------------
            Ticket ID: ${ticket.id}
            Vehicle Type: ${ticket.vehicle.type}
            Duration: ${hours} hour(s)
            Rate: ${rate}/hour
            Total Charge: ${amount}`;
  }
}

export default ParkingLot;
