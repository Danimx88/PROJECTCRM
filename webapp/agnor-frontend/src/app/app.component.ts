import { Component } from '@angular/core';
import { LoginService } from "./Components/Auth/login.service";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agnor-frontend';



  constructor(private autheService: LoginService) { }

  logout() {
    this.autheService.logout();
  }


	

}
