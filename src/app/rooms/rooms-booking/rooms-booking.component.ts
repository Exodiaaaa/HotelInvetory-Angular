import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'hia-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent implements OnInit {
  id!: number;

  id$ = this.router.paramMap.pipe(map((params) => params.get('roomid')));
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    //this.id = this.router.snapshot.params['roomid'];
    /*this.router.params.subscribe((params) => {
      this.id=params['roomid'];
    });*/
  }
}
