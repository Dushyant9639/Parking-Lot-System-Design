import { IFloor, IParkingStrategy, ISlot, ITicket, IVehicle } from "../types";

class DefaultParkingStrategy implements IParkingStrategy {
    park(floors: IFloor[], vehicle: IVehicle): ISlot | null{
        for(let floor of floors){
            const [slotToBook] = floor.getAvailableSlots(vehicle.type);
            if(slotToBook){
                return slotToBook;
            }

        }
        return null;
    }
    
}

export default DefaultParkingStrategy;