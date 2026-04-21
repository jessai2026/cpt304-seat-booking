'use strict';

const { Service, Sector } = require('../script/models');

// ───────────────────────────────────────
// Service class tests
// ───────────────────────────────────────
describe('Service', () => {
  test('constructor sets name and price correctly', () => {
    const s = new Service('Avengers', 12.50);
    expect(s.getName()).toBe('Avengers');
    expect(s.getPrice()).toBe(12.50);
  });

  test('setName updates the name', () => {
    const s = new Service('OldName', 10);
    s.setName('NewName');
    expect(s.getName()).toBe('NewName');
  });

  test('setPrice updates the price', () => {
    const s = new Service('Film', 8);
    s.setPrice(15);
    expect(s.getPrice()).toBe(15);
  });

  test('getId returns the name', () => {
    const s = new Service('Avengers', 10);
    expect(s.getId()).toBe('Avengers');
  });

  test('addReservedSeat adds seat to reserved list', () => {
    const s = new Service('Film', 10);
    const mockSeat = { id: 's-A1-1-1' };
    s.addReservedSeat(mockSeat);
    expect(s.getReservedSeats()).toHaveLength(1);
    expect(s.getReservedSeats()[0].id).toBe('s-A1-1-1');
  });

  test('removeReservedSeat removes correct seat', () => {
    const s = new Service('Film', 10);
    s.addReservedSeat({ id: 's-A1-1-1' });
    s.addReservedSeat({ id: 's-A1-1-2' });
    s.removeReservedSeat('s-A1-1-1');
    expect(s.getReservedSeats()).toHaveLength(1);
    expect(s.getReservedSeats()[0].id).toBe('s-A1-1-2');
  });

  test('clearReservedSeats empties the reserved list', () => {
    const s = new Service('Film', 10);
    s.addReservedSeat({ id: 's-A1-1-1' });
    s.clearReservedSeats();
    expect(s.getReservedSeats()).toHaveLength(0);
  });

  test('bookSeats moves reserved seats to booked', () => {
    const s = new Service('Film', 10);
    s.addReservedSeat({ id: 's-A1-1-1' });
    s.addReservedSeat({ id: 's-A1-1-2' });
    s.bookSeats();
    expect(s.getBookedSeats()).toContain('s-A1-1-1');
    expect(s.getBookedSeats()).toContain('s-A1-1-2');
    expect(s.getReservedSeats()).toHaveLength(0);
  });

  test('bookSeats does not duplicate already booked seats', () => {
    const s = new Service('Film', 10);
    s.setBookedSeatsArray(['s-A1-1-1']);
    s.addReservedSeat({ id: 's-A1-1-1' });
    s.bookSeats();
    const booked = s.getBookedSeats().filter(id => id === 's-A1-1-1');
    expect(booked).toHaveLength(1);
  });

  test('bookSeats with no reserved seats does nothing', () => {
    const s = new Service('Film', 10);
    s.bookSeats();
    expect(s.getBookedSeats()).toHaveLength(0);
    expect(s.getReservedSeats()).toHaveLength(0);
  });

  test('setBookedSeatsArray restores booked seats from saved data', () => {
    const s = new Service('Film', 10);
    s.setBookedSeatsArray(['s-A1-1-1', 's-A1-1-2']);
    expect(s.getBookedSeats()).toHaveLength(2);
  });

  test('setBookedSeatsArray defaults to empty array when called with undefined', () => {
    const s = new Service('Film', 10);
    s.setBookedSeatsArray(undefined);
    expect(s.getBookedSeats()).toEqual([]);
  });

  test('setBookedSeatsArray defaults to empty array when called with null', () => {
    const s = new Service('Film', 10);
    s.setBookedSeatsArray(null);
    expect(s.getBookedSeats()).toEqual([]);
  });
});

// ───────────────────────────────────────
// Sector class tests
// ───────────────────────────────────────
describe('Sector', () => {
  test('constructor formats ID with s- prefix', () => {
    const sec = new Sector('A1', 1.0, 5);
    expect(sec.getId()).toBe('s-A1');
  });

  test('constructor sets price multiplier', () => {
    const sec = new Sector('B1', 1.5, 10);
    expect(sec.getPriceMultiplier()).toBe(1.5);
  });

  test('constructor uses default priceMultiplier when not provided', () => {
    const sec = new Sector('C1', undefined, 3);
    expect(sec.getPriceMultiplier()).toBe(1);
  });

  test('constructor generates correct number of seats', () => {
    const sec = new Sector('A1', 1.0, 3, 3);
    expect(sec.getSeats()).toHaveLength(6);
  });

  test('constructor with no seatsInRow generates empty seats array', () => {
    const sec = new Sector('D1', 1.0);
    expect(sec.getSeats()).toHaveLength(0);
  });

  test('seat IDs follow correct format', () => {
    const sec = new Sector('A1', 1.0, 2);
    const seats = sec.getSeats();
    expect(seats[0].seat).toBe('s-A1-1-1');
    expect(seats[1].seat).toBe('s-A1-1-2');
  });

  test('each seat has correct sector and row references', () => {
    const sec = new Sector('A1', 1.0, 2);
    expect(sec.getSeats()[0].sector).toBe('s-A1');
    expect(sec.getSeats()[0].row).toBe('s-A1-1');
  });

  test('setPriceMultiplier updates the value', () => {
    const sec = new Sector('A1', 1.0, 5);
    sec.setPriceMultiplier(2.0);
    expect(sec.getPriceMultiplier()).toBe(2.0);
  });
});