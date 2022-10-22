import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;
  isAdmin:boolean = false;

  constructor() { }

  login(email:string, password:string){
    if (email === 'admin@gmail.com' && password === 'adminadmin') {
       this.isLoggedIn= true;
       this.isAdmin=true
      //this.route.navigateByUrl('/rooms/add');
    }
    else if (email === 'user@gmail.com' && password === 'useruser') {
      this.isLoggedIn= true;
      this.isAdmin=false;
      //this.route.navigateByUrl('/rooms/add');
    }
    return this.isLoggedIn;
  }
}
