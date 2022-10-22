import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'hia-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      roomId: [''], //new FormControl(''),
      guestEmail: [''],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: [''],
      guestAddress: [''],
      guestCity: [''],
      guestState: [''],
      guestCountry: [''],
      guestZipCode: [''],
      guestCount: [''],
      //guestList: [''],
    });
  }
  addBooking() {
    console.log(this.bookingForm.value);
  }
}
