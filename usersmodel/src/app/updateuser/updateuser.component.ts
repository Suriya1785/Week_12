import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//Import User Service
import { UserService } from './../providers/user.service'
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  pageTitle = 'UpdataUser';
  userName: string = '';
  email: string = '';
  userId: number
  errMsg: string = '';
  error: boolean = false;
  sub:any;
  user:{};

    // create instance of UserService
    constructor(
      private userService: UserService,
      private authService: AuthService,
      private route: ActivatedRoute,
      private router: Router
      ) { };

  onSubmit(): void {
    if (this.email == '') {
      this.errMsg = 'Email is required.';
      this.error = true;
    } else {
      this.error = false;
      this.errMsg = '';

      if (this.authService.getAdminAuthStatus()) {
              // Call UserService to update the User information
      this.userService.updateUser(this.email, this.userId).subscribe(
        data => {
        if (data['error']) {
          this.errMsg = 'User Update unsuccessful.';
          this.error = true;
        } else {
          this.router.navigate(['users']);
        }
      },
      err => {
        this.errMsg = 'User update unsuccessful.';
        this.error = true;
      });
      } else {
        this.errMsg = 'Login to perform authenticated operations.';
        this.error = true;
        this.router.navigate(['/']);
      }
    }
  }

  onReset(): void {
    // this.userName = this.user.USERNAME
    // this.email = this.user.EMAIL;
    this.error = false;
    this.errMsg = '';
  }

  ngOnInit() {

      // get username from Query Params
      // Subscribe to Observable
      // pass anonymoue callback function to subscribe method
      this.sub = this.route
                .queryParams
                .subscribe(params => {
                  this.userId = params['userId'];
                });

    this.userService.getUser(this.userId).subscribe(
      data => {
          this.user = data;
          this.userName = data.USERNAME;
          this.email = data.EMAIL;
      },
      err => {
          console.log('failure');
          this.errMsg = 'User Info load unsuccessful.';
          this.error = true;
      });
  }

}
