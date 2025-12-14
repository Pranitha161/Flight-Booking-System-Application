export interface Price {
  oneWay: number;
  roundTrip: number;
}

export interface Flight {
  id?: string;
  fromPlace: string;
  toPlace: string;
  arrivalTime: string;
  departureTime: string;
  availableSeats: number;
  price: Price;
  airlineId: string;
}
