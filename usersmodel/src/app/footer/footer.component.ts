import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear: number = 2019;
  // declare a method
  getCurrentYear(): number {
    return this.currentYear;
  }
  constructor() { }

  ngOnInit() {
  }

}
