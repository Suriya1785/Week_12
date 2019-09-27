import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticated: boolean = false;
  private adminAuthenticated: boolean = false;
  private usersEndpoint: string = 'http://localhost:3000/users/login/';
	private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    withCredentials:true
  };

  constructor(private http: HttpClient) { }


  /* Function is to call server to authenticate based on e-mail and password  
  * Param: email (string) - user entered email
  * Param: password (string) - user entered password  
  * Calls: None
  * Called by: Login component
  */
  login(email: string, password:string) : Observable<any> {
    console.log("authService");
    console.log(`${email} + ${password}`)
    return this.http.post(this.usersEndpoint, {email : email, userPassword:password}, this.httpOptions)
    .pipe(map(res => <any[]>res));
  }

  /* Function is to set user authentication status upon successful login
  * Param: status (boolean) - user authentication status
  * Calls: None
  * Called by: Login component
  */
  setUserAuthStatus(status: boolean){
    this.userAuthenticated = status;
  }

  /* Function is to get user authentication status  
  * Param: None
  * Calls: None
  * Called by: Update User, Delete User, Admin, Team, League and Member component
  */
  getUserAuthStatus(){
    return this.userAuthenticated;
  }

  /* Function is to set admin authentication status upon successful login
  * Param: status (boolean) - admin authentication status
  * Calls: None
  * Called by: Login component
  */
  setAdminAuthStatus(status: boolean){
    this.adminAuthenticated = status;
  }

 /* Function is to get admin authentication status  
  * Param: None
  * Calls: None
  * Called by: Admin 
  */
  getAdminAuthStatus(){
    return this.adminAuthenticated;
  }


  // Hard-coded userName validation demo purposes
  // USER_NAME: string = 'Admin';
  // PASSWORD: string = 'password';

  // constructor() { }

  // login(userName:string, password:string){
  //   if (userName === this.USER_NAME && password === this.PASSWORD) {
  //     console.log('AuthService: Login successful!');
  //     return  true;
  //   } else {
  //     console.log('AuthService: Login failed!');
  //     return false;
  //   }
  // }
}
