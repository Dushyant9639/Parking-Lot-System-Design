"use strict";
// client code for Parking Lot
// Controller
/**
 * Routes -> Controller(BL)
 * Routes -> Controller -> Service(BL)
 *
 * Controller : client and business layer
 * client : client code : index.ts
 * controller : to handle the commands
 * business logic : class, interfaces, OOPS
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const readline_1 = __importDefault(require("readline"));
const CommandController_1 = __importDefault(require("./controller/CommandController"));
const ParkingLotController_1 = require("./controller/ParkingLotController");
/**
 * npm install @babel/cli @babel/core @babel/preset-env

 */
function readCommand() {
    const fileName = process.argv[2];
    const file = (0, path_1.join)(process.cwd(), fileName);
    if (!fs_1.default.existsSync(file)) {
        throw new Error(`${file} File not found`);
    }
    const rl = readline_1.default.createInterface({
        input: fs_1.default.createReadStream(file)
    });
    const parkingLotController = new ParkingLotController_1.ParkingLotController();
    const commandController = new CommandController_1.default(parkingLotController);
    rl.on('line', (data) => {
        const [command, ...args] = data.split(' ');
        if (command === 'exit') {
            console.log('Exiting!!');
            return rl.close();
        }
        let resp = '';
        try {
            resp = commandController.executeCommand(command, ...args);
        }
        catch (e) {
            resp = 'Unknow Error';
            if (e instanceof Error) {
                resp = e.message;
            }
        }
        finally {
            console.log('RESPONSE>>', resp);
        }
    });
}
readCommand();
// Client -> Controller -> Service class
// npm start commands.txt
