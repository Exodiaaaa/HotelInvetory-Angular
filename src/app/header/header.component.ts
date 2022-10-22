import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hia-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = '';
  constructor() {}

  ngOnInit(): void {}
}
