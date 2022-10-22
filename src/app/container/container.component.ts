import {
  AfterContentInit,
  Component,
  ContentChild, Host,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hia-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  //providers: [RoomsService]
})
export class ContainerComponent implements OnInit, AfterContentInit {
  constructor() {}

  @ContentChild(EmployeeComponent) content!: EmployeeComponent;

  ngAfterContentInit(): void {
    console.log(this.content);
    this.content.empName = 'Hassan';
  }

  ngOnInit(): void {}
}
