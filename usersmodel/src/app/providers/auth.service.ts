import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersEndpoint: string = 'http://localhost:3000/users/login/';
	private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    withCredentials:true
  };

  constructor(private http: HttpClient) { }

  login(email: string, password:string) : Observable<any> {
    console.log("authService");
    console.log(`${email} + ${password}`)
    return this.http.post(this.usersEndpoint, {email : email, userPassword:password}, this.httpOptions)
    .pipe(map(res => <any[]>res));
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
