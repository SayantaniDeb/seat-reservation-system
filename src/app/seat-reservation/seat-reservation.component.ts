// src/app/seat-reservation/seat-reservation.component.ts
import { Component } from '@angular/core';

interface Seat {
  seatNumber: number;
  isBooked: boolean;
}

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent {
  seats: Seat[] = [];
  requestedSeats: number = 0;
  bookedSeats: number[] = [];
  errorMessage: string = '';

  constructor() {
    // Initialize 80 seats
    for (let i = 1; i <= 80; i++) {
      this.seats.push({ seatNumber: i, isBooked: false });
    }
  }

  reserveSeats(requestedSeats: number) {
    this.errorMessage = '';

    // Condition 2: Limit seat reservation to 7 at a time
    if (requestedSeats > 7) {
      this.errorMessage = 'You can only reserve up to 7 seats at a time.';
      return;
    }

    // Find available seats in rows first (7 seats per row, last row has 3 seats)
    const seatsToBook = this.findSeats(requestedSeats);

    if (seatsToBook.length === requestedSeats) {
      // Mark seats as booked
      seatsToBook.forEach((seatIndex) => {
        this.seats[seatIndex].isBooked = true;
        this.bookedSeats.push(this.seats[seatIndex].seatNumber);
      });

      // Display a window alert with the booked seat numbers
      
    }
  }

  // Method to find seats in a single row or closest grouping if not enough in one row
  findSeats(requestedSeats: number): number[] {
    const rowCapacity = 7;
    let availableSeats: number[] = [];

    // Try to find available seats in a single row
    for (let i = 0; i < 80; i += rowCapacity) {
      availableSeats = [];
      for (let j = i; j < i + rowCapacity && j < 80; j++) {
        if (!this.seats[j].isBooked) {
          availableSeats.push(j);
        }
        if (availableSeats.length === requestedSeats) {
          return availableSeats; // Found enough seats in one row
        }
      }
    }

    // If no single row has enough seats, find the closest available grouping
    availableSeats = [];
    for (let i = 0; i < 80 && availableSeats.length < requestedSeats; i++) {
      if (!this.seats[i].isBooked) {
        availableSeats.push(i);
      }
    }

    return availableSeats.length === requestedSeats ? availableSeats : [];
  }
}
