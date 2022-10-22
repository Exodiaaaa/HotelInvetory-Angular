import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hia-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  //providers: [RoomsService],
})
export class EmployeeComponent implements OnInit {
  empName: string = 'BONDAGANI LHAJ LATMANI';
  constructor( private roomService: RoomsService) {}

  ngOnInit(): void {}
}
