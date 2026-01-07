import { IFloor, IParkingStrategy, ISlot } from "../types";
import Vehicle from "./Vehicle";

class LeastFilledParkingStrategy implements IParkingStrategy{
    park(floors: IFloor[], vehicle: Vehicle): ISlot | null {

        let selectedFloor : IFloor |null = null
        let maxFreeSlots = -1

        for(let floor of floors ){
            let freeSlots = floor.slots.filter(
                slot=> !slot.isOccupied && slot.type == vehicle.type
            )
            if(freeSlots.length>maxFreeSlots){
                maxFreeSlots = freeSlots.length 
                selectedFloor = floor
            }
        }
        if(!selectedFloor || maxFreeSlots==0) return null
        return selectedFloor.slots.find(
            slot=> !slot.isOccupied && slot.type == vehicle.type
        ) || null
    }
}
 
 export default LeastFilledParkingStrategy