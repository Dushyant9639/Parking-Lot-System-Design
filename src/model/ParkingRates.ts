import { VehicleType } from "../types";

export let HOURLY_RATES: Record<VehicleType, number> = {
  [VehicleType.CAR]: 20,
  [VehicleType.BIKE]: 10,
  [VehicleType.TRUCK]: 30,
  [VehicleType.EV_CAR]: 25,
};
