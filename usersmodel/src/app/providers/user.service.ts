import { Injectable } from '@angular/core';
import { User } from './../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User [] = [];

  private registerEndpoint: string = 'http://localhost:3000/users/register/';
  private getUsersEndpoint: string = 'http://localhost:3000/admin/listAllUsers/';
  private getNonAdminEndpoint: string = 'http://localhost:3000/admin/listNoAdminUsers/';
  private updateUserEndpoint: string = 'http://localhost:3000/users/';
  private getUserEndpoint: string = 'http://localhost:3000/users/byId/';
	private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    withCredentials:true
  };

  constructor(private http: HttpClient) { }

  // addUser(firstName: string, lastName: string, email:string){
  //   this.users.push(new User(firstName, lastName, email));
  //   console.log('UserLoad service entered');
  //   return this.users;
  // }

  addUser(firstName: string, lastName: string, email:string, password:string) : Observable<any>{
    let username = firstName + lastName;
    return this.http.post(this.registerEndpoint, {email : email, userName:username, userPassword:password, isAdmin:0}, this.httpOptions)
    .pipe(map(res => <any[]>res));
  }

  getUsers(): Observable<any>{
    return this.http.get(this.getUsersEndpoint, this.httpOptions)
    .pipe(map(res => <any[]>res));
  }

  getUser(userId:number): Observable<any>{
    return this.http.get(`${this.getUserEndpoint}${userId}`, this.httpOptions)
    .pipe(map(res => <any[]>res));
  }

  getNonAdminUsers(): Observable<any>{
    return this.http.get(this.getNonAdminEndpoint, this.httpOptions)
    .pipe(map(res => <any[]>res));
  }

  updateUser(email:string, userId:number): Observable<any>{
    return this.http.put(this.updateUserEndpoint, {email : email, id:userId}, this.httpOptions)
    .pipe(map(res => <any[]> res));
  }

}
