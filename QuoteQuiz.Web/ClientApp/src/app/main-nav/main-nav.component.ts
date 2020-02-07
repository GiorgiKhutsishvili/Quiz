import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/account/AuthService';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

    logout() {
        this.authService.logout();
    }

}
