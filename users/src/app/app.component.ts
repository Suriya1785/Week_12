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

  addNewUser: boolean = false;

  newUser: string = '';
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
    this.addNewUser = false;
    this.newUserAdded = false; 

  }

  onAddNewUser(): void{
    this.newUser = `${this.firstName} - ${this.lastName} - ${this.email}`; 
    this.addNewUser = true;   
    this.newUserAdded = true;
  }

  getColor(): string {
    return this.newUserAdded === true ? '#000080' : '#FF0000'; // navy : red
  }
}