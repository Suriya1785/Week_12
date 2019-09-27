import { Component, OnInit } from '@angular/core';
import { User } from './user.module';
import { UserService } from './../providers/user.service';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../providers/auth.service';
// import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = 'Users';
  sub: any;
  userName: string = '';
  password: string ='';

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  currentYear: number = 2019;
  registerError: boolean = false;
  loadError: boolean = false;
  errMsg: string = '';

  newUserAdded: boolean = false;

  // declare a method
  getCurrentYear(): number {
    return this.currentYear;
  }

  //Array to hold user objects
  users : Array<string> = [];

    // create instance of UserService
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
    ) { };

    onEditUser(userId: number): void{
      console.log('edit user +');
      console.log(event.target);

      if (this.authService.getAdminAuthStatus()){
        this.userService.getUser(userId).subscribe(
          data => {
              console.log('success');
              this.firstName = data.USERNAME;
              this.email = data.EMAIL;
          },
          err => {
              console.log('failure');
          }
      )
      } else {
        console.log("No authentication to edit user");
      }

     
      // this.userService.updateUser(this.email, this.userId).subscribe(
      //   data => {

      //   },
      //   err => {

      //   }
      // )
    }

    onDeleteUser(x): void{
      console.log('delete user');
    }

  onAddNewUser(): void{
    this.registerError = false;
    if (this.firstName === '' || this.lastName == '' || this.email === '') {
    // if (this.firstName === '' || this.lastName == '' || this.password === '' || this.email === '') {
      this.errMsg = 'User Name / Password / Email are required.';
      this.registerError = true;
    } else {
      this.userService.addUser(this.firstName, this.lastName, this.email, this.password).subscribe (
        data => {
            if (data !== null) {
            this.registerError = false;
            console.log(data);
            console.log(data.user);
            this.userService.getUsers().subscribe (
              data => {
                if (data !== null){
                  this.users = data.users;
                }
              },
              err => {
                if (err.status == 403){
                  this.errMsg = 'Registration unsuccessful.';
                  this.registerError = true;
              }
                else {
                  this.registerError = true;
                  this.errMsg = `Error - ${err}`;
                }
              }
            )
            // this.users = data.user;
            this.newUserAdded = true;
          } else {
            this.errMsg = 'User registration error';
          }
        },
        err => {
          if (err.status == 403){
            this.errMsg = 'Registration unsuccessful.';
            this.registerError = true;
        }
          else {
            this.registerError = true;
            this.errMsg = `Error - ${err}`;
          }
        }
      );
    }   
  }


  getColor(): string {
    return this.newUserAdded === true ? '#000080' : '#FF0000'; // navy : red
  }

    // executed when reset button is clicked 
    onReset(): void {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      // this.newUserAdded = false; 
  
    }
/*
* function is to logout and route to home page
* Params: None
* Calls: None
* Called by: logOut button in user component
*/
    onLogout() {
      this.router.navigate(['/']);
    }

/*
* function is to load users during admin update page 
* Params: None
* Calls: None
* Called by: login component
*/
  ngOnInit() {
        // get username from Query Params
      // Subscribe to Observable
      // pass anonymoue callback function to subscribe method
      this.sub = this.route
                .queryParams
                .subscribe(params => {
                  this.userName = params['username'];
                });
      //Below calls getUsers service to get list of all existing users
      this.userService.getUsers().subscribe (
                  data => {
                    if (data !== null){
                      this.users = data.users;
                      this.newUserAdded = true;
                      console.log(this.users);
                    }
                  },
                  err => {
                    if (err.status == 403){
                      this.errMsg = 'Loading Existing Users unsuccessful.';
                      this.loadError = true;
                  }
                    else {
                      this.loadError = true;
                      this.errMsg = `Error - ${err}`;
                    }
                  });
  }
}
