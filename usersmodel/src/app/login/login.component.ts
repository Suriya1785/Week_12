import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';
  loginError: boolean = false;
  errMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(): void{
    this.loginError = false;
    if (this.userName === '' || this.password === '') {
      this.errMsg = 'User Name and Password are required.';
      this.loginError = true;
    } else {
      // call login() method in AuthService to validate login creds
      this.authService.login(this.userName, this.password).subscribe(
        data => 
        {
          if (data !== null) {
          this.authService.setAdminAuthStatus(true);
          this.authService.setUserAuthStatus(true);
          this.loginError = false;
          // // load users "page"
          // this.router.navigate(['users'], {queryParams: {username: data.USERNAME, userId:data.USERID}});
          this.router.navigate(['updateuser'], {queryParams: {username: data.USERNAME, userId:data.USERID}});
        }
      },
      err => 
      {
        if (err.status == 403){
            this.errMsg = 'Login unsuccessful.';
            this.loginError = true;
        }
          else {
            this.loginError = false;
            this.errMsg = `Error - ${err}`;
          }
        }
      );
    }
  }

  // onLogin(): void {
  //   // call login() method in AuthService to validate login creds
  //   if (this.authService.login(this.userName, this.password)) {
  //     this.loginError = false;
  //     // load leagues "page"
  //     this.router.navigate(['users']);
  //     // , {queryParams: {username: this.userName}});
  //     // this.router.navigate(['leagues'], {queryParams: {username: this.userName}});
  //   } else {
  //     this.loginError = true;
  //   }
  // }
}
