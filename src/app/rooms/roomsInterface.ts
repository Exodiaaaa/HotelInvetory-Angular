export interface RoomsInterface {
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
}

export interface RoomsListsInterface {
  roomNumber?: string;
  roomType: string;
  amenities: string;
  price: number;
  photos: string;
  checkInTime: Date;
  checkOutTime: Date;
  rating: number;
}
