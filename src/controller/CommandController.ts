import { ParkingLotController } from "./ParkingLotController";

class CommandController {
  parkingLotController: ParkingLotController;

  constructor(parkingLotController: ParkingLotController) {
    this.parkingLotController = parkingLotController;
  }

//   executeCommand(command: string, ...args: Array<string | number>) {
//     console.log("\nCOMMAND>>", command, args, "\n");
//     const { parkingLotController } = this;
//     switch (command) {
//       case "create_parking_lot":
//         return parkingLotController.createParkingLot(
//           ...(args as [string, number, number])
//         );
//       case "park_vehicle":
//         return parkingLotController.parkVehicle(
//           ...(args as [string, string, string])
//         );
//       case "unpark_vehicle":
//         return parkingLotController.unparkVehicle(...(args as [string]));
//       case "display":
//         return parkingLotController.display(...(args as [string, string]));
//       case "set_strategy":
//         return parkingLotController.setStrategy(...(args as [string]));
//       default:
//         return "Invalid Command";
//     }
//   }
executeCommand(command: string, ...args: string[]) {
  console.log("\nCOMMAND>>", command, args, "\n");
  const { parkingLotController } = this;

  switch (command) {
    case "create_parking_lot":
      return parkingLotController.createParkingLot(
        args[0],
        Number(args[1]),
        Number(args[2])
      );

    case "park_vehicle":
      return parkingLotController.parkVehicle(args[0], args[1], args[2]);

    case "unpark_vehicle":
      return parkingLotController.unparkVehicle(args[0]);

    case "display":
      return parkingLotController.display(args[0], args[1]);

    case "set_strategy":
      return parkingLotController.setStrategy(args[0]);

    default:
      return "Invalid Command";
  }
}

}

export default CommandController;
