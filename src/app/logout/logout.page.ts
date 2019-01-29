import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    //Upon reaching logout page, it will perform logout action
    this.authService.logout();
  }

}
