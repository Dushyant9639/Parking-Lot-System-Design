import { IFloor, IParkingStrategy, ISlot, IVehicle } from "../types";

class RandomParkingStrategy implements IParkingStrategy{
    park(floors: Array<IFloor>, vehicle: IVehicle): ISlot | null {
        const availableSlots: Array<ISlot> = [];
        floors.forEach((floor) => {
            const slots = floor.getAvailableSlots(vehicle.type);
            availableSlots.push(...slots);
        });

        if (availableSlots.length === 0){
            return null;    
        }

        const randomSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
        return randomSlot;
    }
}

export default RandomParkingStrategy;