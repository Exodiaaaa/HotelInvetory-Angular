import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localstorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import { filter } from 'rxjs';
import {NavigationEvent} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model";

@Component({
  selector: 'hia-root',
  templateUrl: './app.component.html',
  //template : `<h1>world from inline template</h1>
  //<p>angular look cool so far !</p>`,
  styleUrls: ['./app.component.scss'],
  //styles: [`h1 {color : cyan;} p{color: red}`]
})
export class AppComponent implements OnInit {
  //implementsAfterViewInit {
  title = 'hotelinventoryapp';

  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localstorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }

  ngOnInit() {
    /*this.router.events.subscribe((event) => {
      console.log(event);
    });*/
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        console.log('Navigation start');
      });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('Navigation ended');
      });

    this.loggerService?.log('AppComponent.ngOnInit()');
    //this.name.nativeElement.innerText = 'We are making it ';
    this.localStorage.setItem('name', 'Imran jeberberzebedeyorom');
  }

  // role = 'Admin';

  //@ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  //ngAfterViewInit() {
  //const componentRef = this.vcr.createComponent(RoomsComponent);
  //componentRef.instance.numberOfRooms = 690;
  //}
}
