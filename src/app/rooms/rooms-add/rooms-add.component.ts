import { Component, OnInit } from '@angular/core';
import { RoomsListsInterface } from '../roomsInterface';
import { RoomsService } from '../services/rooms.service';
import {NgForm, NgModel} from "@angular/forms";

@Component({
  selector: 'hia-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss'],
})
export class RoomsAddComponent implements OnInit {
  room: RoomsListsInterface = {
    roomType: '',
    amenities: '',
    price: 0,
    checkInTime: new Date(),
    checkOutTime: new Date(),
    photos: '',
    rating: 0,
  };

  successMessage: string = '';
  constructor(private roomService: RoomsService) {}

  ngOnInit(): void {}

  AddRoom(roomsForm: NgForm) {
    this.roomService
      .addRoom(this.room)
      .subscribe( (data) => {this.successMessage = 'Room Added Successfully';
        roomsForm.reset();
      });
  }
}
