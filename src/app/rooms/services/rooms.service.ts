import { RoomsListsInterface } from '../roomsInterface';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { Inject, Injectable } from '@angular/core';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomsLists: RoomsListsInterface[] = [];
 // headers = new HttpHeaders({ token: '12345XnSD' });

  getRooms$ = this.http
    .get<RoomsListsInterface[]>('/api/rooms')
    .pipe(shareReplay(1));

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log(this.config.apiEndpoint);
    console.log('Rooms Service has been initialized....');
  }

  getRooms() {
    return this.http.get<RoomsListsInterface[]>('/api/rooms');
  }
  addRoom(room: RoomsListsInterface) {
    return this.http.post<RoomsListsInterface[]>('/api/rooms', room);
  }

  editRoom(room: RoomsListsInterface) {
    return this.http.put<RoomsListsInterface[]>(
      `/api/rooms/${room.roomNumber}`,
      room
    );
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomsListsInterface[]>(`/api/rooms/${id}`);
  }
  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);
  }
}
