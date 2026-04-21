'use strict';

class Service {
  constructor(name, price) {
    this._name = name;
    this._price = price;
    this._seatsReserved = [];
    this._seatsBooked = [];
  }

  getName() { return this._name; }
  setName(name) { this._name = name; }
  getPrice() { return this._price; }
  setPrice(price) { this._price = price; }
  getId() { return this._name; }

  getReservedSeats() { return this._seatsReserved; }
  addReservedSeat(seat) { this._seatsReserved.push(seat); }
  removeReservedSeat(seatId) {
    this._seatsReserved = this._seatsReserved.filter(s => s.id !== seatId);
  }
  clearReservedSeats() { this._seatsReserved = []; }

  getBookedSeats() {
    return this._seatsBooked;
  }

  bookSeats() {
    this._seatsReserved.forEach(seat => {
      if (!this._seatsBooked.includes(seat.id)) {
        this._seatsBooked.push(seat.id);
      }
    });
    this.clearReservedSeats();
  }

  setBookedSeatsArray(arr) {
    this._seatsBooked = arr || [];
  }
}

class Sector {
  constructor(id, priceMultiplier = 1, ...seatsInRow) {
    this._id = `s-${String(id)}`;
    this._priceMultiplier = priceMultiplier;
    this._rows = seatsInRow.length;
    this._seats = [];

    for (let i = 1; i <= seatsInRow.length; i++) {
      const rowId = `${this._id}-${i}`;
      for (let j = 1; j <= seatsInRow[i - 1]; j++) {
        this._seats.push({
          sector: this._id,
          row: rowId,
          seat: `${rowId}-${j}`
        });
      }
    }
  }

  getId() { return this._id; }
  getPriceMultiplier() { return this._priceMultiplier; }
  setPriceMultiplier(val) { this._priceMultiplier = val; }
  getSeats() { return this._seats; }
}

if (typeof module !== 'undefined') {
  module.exports = { Service, Sector };
}