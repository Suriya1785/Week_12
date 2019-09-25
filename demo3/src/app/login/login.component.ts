import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  USER_NAME: string = 'Admin';
  PASSWORD: string = 'password';
  
  userName: string = '';
  password: string = '';
  loginError: boolean = false;
  onLogin(): void {
    if (this.userName === this.USER_NAME && this.password === this.PASSWORD) {
      this.loginError = false;
    } else {
      this.loginError = true;
    }
  }
}