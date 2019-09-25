import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Users';

  firstName: string = 'Foo';
  lastName: string = 'Bar';
  email: string = 'foobar@test.com';
  currentYear: number = 2019;

  users: Array<object> = [];

  newUserAdded: boolean = false;

  // declare a method
  getCurrentYear(): number {
    return this.currentYear;
  }

  // executed when reset button is clicked 
  onReset(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    // this.newUserAdded = false; 

  }

  onAddNewUser(): void{
    this.users.push(
      {"firstName": this.firstName, "lastName": this.lastName, "email": this.email}
      );
    this.newUserAdded = true;
  }

  getColor(): string {
    return this.newUserAdded === true ? '#000080' : '#FF0000'; // navy : red
  }
}