"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ticket_1 = __importDefault(require("../model/Ticket"));
class TicketController {
    constructor() { }
    static getInstance() {
        if (!TicketController.instance) {
            TicketController.instance = new TicketController();
        }
        return TicketController.instance;
    }
    static generateTicket(lotId, slotId, floorId, vehicle) {
        const ticketId = `${lotId}_${floorId}_${slotId}`;
        const ticket = new Ticket_1.default(ticketId, vehicle);
        TicketController.tickets.set(ticketId, ticket);
        return ticket;
    }
    static getTicketWithId(ticketId) {
        return TicketController.tickets.get(ticketId);
    }
    static deleteTicket(ticketId) {
        return TicketController.tickets.delete(ticketId);
    }
}
TicketController.tickets = new Map();
exports.default = TicketController;
