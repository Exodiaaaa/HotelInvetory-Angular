import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RoomsInterface, RoomsListsInterface } from './roomsInterface';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import {catchError, map, Observable, of, Subject, Subscription} from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import {ConfigService} from "../services/config.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'hia-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  hotelName = 'Hotel lgasba';
  numberOfRooms = 69;
  hideRooms = true;
  selectedRoom!: RoomsListsInterface;
  title = 'Room Lists:';

  totalBytes = 0;

  rooms: RoomsInterface = {
    totalRooms: 109,
    availableRooms: 69,
    bookedRooms: 30,
  };

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  roomsLists: RoomsListsInterface[] = [];
  subscription!: Subscription;
  room$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
    //  console.log('Error !');
      this.error$.next(err.message);
      return of([]);
    })
  );

  stream = new Observable<string>((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    //observer.error('error');
  });

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms)=>rooms.length)
  )

  constructor(@SkipSelf() private roomsService: RoomsService, private configService:ConfigService) {} //6:47

  ngAfterViewChecked(): void {}

  ngAfterViewInit(): void {
    //this.headerComponent.title = 'Hotêl Rooms :';
    //  this.headerComponents.last.title = 'Bola rooms ';
    //this.headerComponents.get();
  }

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made ');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request Success !');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    });
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Complete'),
      error: (err) => console.log(err),
    });
    this.stream.subscribe((data) => console.log(data));
    //this.roomsLists = this.roomsService.getRooms();
    /*this.subscription=this.roomsService.getRooms$.subscribe((rooms) => {
      this.roomsLists = rooms;
    });*/
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Best Rooms Lists';
  }
  selectRoom(room: RoomsListsInterface) {
    this.selectedRoom = room;
  }
  addRoom() {
    const room: RoomsListsInterface = {
      //roomNumber: '911',
      roomType: 'Prestige room',
      amenities: 'all options',
      price: 60000,
      photos: 'samba.pnghoqospjdpq',
      checkInTime: new Date('11/09/2022'),
      checkOutTime: new Date('19/09/2022'),
      rating: 9,
    };
    //this.roomsLists.push(room);
    //this.roomsLists = [...this.roomsLists, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomsLists = data;
    });
  }

  ngDoCheck(): void {
    console.log('on changes is called');
  }

  @ViewChild(HeaderComponent)
  headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerComponents!: QueryList<HeaderComponent>;

  editRoom() {
    const room: RoomsListsInterface = {
      roomNumber: '3',
      roomType: 'Prestige room',
      amenities: ' all options',
      price: 696969,
      photos: 'pgjofpsdjofp.png',
      checkInTime: new Date('11/09/2022'),
      checkOutTime: new Date('19/09/2022'),
      rating: 9,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomsLists = data;
    });
  }
  deleteRoom() {
    this.roomsService.deleteRoom('1').subscribe((data) => {
      this.roomsLists = data;
    });
  }
  /*ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }*/
  priceFilter = new FormControl(0);
}
