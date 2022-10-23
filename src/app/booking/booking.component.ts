import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validator,
  Validators,
} from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hia-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.router.snapshot.paramMap.get('roomId');
    this.bookingForm = this.formBuilder.group(
      {
        roomId: [
          { value: roomId, disabled: true },
          { validators: [Validators.required] },
        ], //new FormControl('2'),
        guestEmail: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
          },
        ],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: ['', { updateOn: 'blur' }],
        bookingDate: [''],
        mobileNumber: ['', { updateOn: 'blur' }],
        guestName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            CustomValidator.ValidateName,
            CustomValidator.ValidateSpecialChar('!'),
          ],
        ],
        address: this.formBuilder.group({
          addressLine: ['', { validators: [Validators.required] }],
          addressLine2: [''],
          city: ['', { validators: [Validators.required] }],
          state: ['', { validators: [Validators.required] }],
          country: [''],
          zipCode: [''],
        }),
        //guestList: [''],
        guests: this.formBuilder.array([this.addGuestControl()]),
        tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      },
      { updateOn: 'blur', validators: [CustomValidator.ValidateDate] }
    );

    this.getBookingData();

    /*this.bookingForm.valueChanges.subscribe((data) => {
      this.bookingService.bookRoom(data).subscribe((data) => {});
    });*/
    this.bookingForm.valueChanges
      .pipe(
        exhaustMap((data) => this.bookingService.bookRoom(data)) //15:30:51
      )
      .subscribe((data) => console.log(data));
  }
  addBooking() {
    console.log(this.bookingForm.getRawValue());

    this.bookingForm.reset({
      roomId: '', //new FormControl('2'),
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }
  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  getBookingData() {
    this.bookingForm.patchValue({
 //     roomId: '2', //new FormControl('2'),
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('22-Feb-2022'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
    });
  }

  addGuestControl() {
    return this.formBuilder.group({
      guestName: ['', { validators: [Validators.required] }],
      age: new FormControl(''),
    });
  }
  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }
  removePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}
