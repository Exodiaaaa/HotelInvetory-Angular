import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RoomsListsInterface } from '../roomsInterface';

@Component({
  selector: 'hia-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
//  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rooms: RoomsListsInterface[] = [];
  @Input() title: string = '';
  @Input() price=0;

  @Output() selectedRoom = new EventEmitter<RoomsListsInterface>();

  constructor() {

  }

  ngOnDestroy(): void {
    console.log('On destroy is called !');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {

  }

  selectRoom(room: RoomsListsInterface) {
    this.selectedRoom.emit(room);
  }
}
