import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { LoginService } from '../Auth/login.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterContentInit, OnChanges {
 
  usuarioActual: any = null; 

  constructor(private autheService: LoginService) { }


  ngOnChanges(changes: SimpleChanges) {
    this.usuarioActual= this.getDecodedAccessToken(localStorage.getItem('currentUser'))
  }

  ngOnInit(): void {
  }
  ngAfterContentInit(){
      this.usuarioActual= this.getDecodedAccessToken(localStorage.getItem('currentUser'))
  }
  logout() {
    this.autheService.logout();
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('currentUser') == null) {

      return false
    }
    else
    this.usuarioActual= this.getDecodedAccessToken(localStorage.getItem('currentUser'))
      return true
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  isAdmin():boolean{
    if (localStorage.getItem('currentUser') == null) {

      return false
    }
    
    this.usuarioActual= this.getDecodedAccessToken(localStorage.getItem('currentUser'))
    if(this.usuarioActual.rol=='ADMINISTRADOR'){
      return true
    }
      return false
  }
}
