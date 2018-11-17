import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private router: Router) {
    }

    goToFindTravel() {
        this.router.navigate(['home']);
    }

    goToNewTravel() {
        this.router.navigate(['new-travel']);
    }

    goToSearchMyTravels() {
        this.router.navigate(['my-travel']);
    }
}
