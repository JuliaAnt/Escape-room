export type Slot = {
  time: string;
  isAvailable: boolean;
}

export type BookingInfo = {
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  slots: {
    today: Slot[];
    tomorrow: Slot[];
  };
}
