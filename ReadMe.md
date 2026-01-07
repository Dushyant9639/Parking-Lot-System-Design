# 🚗 Parking Lot System – System Design in TypeScript

A modular, extensible Parking Lot System built using **TypeScript** and **Object-Oriented Design principles**. This project demonstrates clean architecture, design patterns, and real-world system design features such as multiple parking strategies, EV support, and hourly billing.

---

## ✨ Features

* 🏢 Multi-floor parking lot support
* 🚙 Multiple vehicle types:

  * CAR (Standard)
  * EV_CAR (Electric Vehicles)
  * BIKE
  * TRUCK
* ⚡ Reserved EV slots on every floor
* 🧠 Pluggable parking strategies:

  * Default (Nearest available)
  * Random
  * Least Filled Floor
* 🎫 Ticket-based parking system
* ⏱ Entry & exit time tracking
* 💰 Automatic hourly parking charge calculation
* 📊 Display system for free and occupied slots
* 🧱 Clean layered architecture (Client → Controller → Services → Models)

---

## 🏗️ Architecture Overview

```
Client (index.ts)
   ↓
CommandController
   ↓
ParkingLotController
   ↓
ParkingLot
   ↓
Floors → Slots → Vehicles
   ↓
Parking Strategies (Strategy Pattern)
```

Design patterns used:

* Strategy Pattern (parking logic)
* Singleton Pattern (ticket management)
* Factory-style object creation
* SOLID principles

---

## 🧠 Parking Strategies

* **DEFAULT** → First available nearest slot
* **RANDOM** → Random free slot
* **LEAST_FILLED** → Floor with minimum occupied slots

Strategies can be changed at runtime.

---

## ⚡ EV Slot Rules

* Each floor has at least **one EV reserved slot**
* Only EV cars can park in EV reserved slots
* If EV reserved slot is full, EV cars may use normal CAR slots
* Normal vehicles cannot occupy EV reserved slots

---

## 💰 Hourly Parking Charges

| Vehicle Type | Rate (per hour) |
| ------------ | --------------- |
| CAR          | 20 units        |
| BIKE         | 10 units        |
| TRUCK        | 30 units        |
| EV_CAR       | 25 units        |

Charges are calculated automatically when a vehicle is unparked.

---

## 📄 Example Commands

```
create_parking_lot PR123 2 6
park_vehicle CAR KA-01-HH-1234 Red
park_vehicle EV_CAR KA-05-EE-7777 Blue
set_strategy LEAST_FILLED
display free_slots CAR
unpark_vehicle PR123_1_4
```

---

## 🧾 Sample Output (Unpark)

```
Vehicle Unparked Successfully
------------------------------
Ticket ID: PR123_1_4
Vehicle Type: CAR
Duration: 2 hour(s)
Rate: 20/hour
Total Charge: 40
```

---

## 🛠️ Installation & Run

```bash
# install dependencies
npm install

# build
npm run build

# run with input file
npm start commands.txt
```

---

## 🧪 Input Method

The system reads commands from a file:

```
create_parking_lot PR123 3 10
park_vehicle BIKE KA-11-AA-1111 Black
unpark_vehicle PR123_1_2
```

---

## 📦 Folder Structure

```
src/
 ├── controller/
 ├── model/
 ├── strategy/
 ├── types/
 ├── index.ts
```

---

## 🚀 Why this project is strong

* Real-world extensible system design
* Interview-ready architecture
* Clear separation of concerns
* Easily testable components
* Supports future features like pricing rules, reservations, reports

---

## 👨‍💻 Author

**Dushyant Goyal**
B.Tech Biotechnology | Software Development & System Design

---

## 📌 Future Enhancements

* Admin revenue dashboard
* Monthly parking passes
* REST API interface
* Database persistence
* Unit & integration tests

---

⭐ If you like this project, don’t forget to star the repo!
