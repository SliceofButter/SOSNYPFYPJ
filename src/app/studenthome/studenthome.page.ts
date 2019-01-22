import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-studenthome',
  templateUrl: './studenthome.page.html',
  styleUrls: ['./studenthome.page.scss'],
})
export class StudenthomePage implements OnInit {
  email: any;
  constructor(private route: ActivatedRoute,private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.email = data;
    });
  }

  // ionViewWillEnter(){
  //   //call method to check if user is authenticated upon loading this page
  //   this.CheckIfAuthenticated();
  // }

  // //this method will check whether the user has authenticated on this page
  // CheckIfAuthenticated(){
  //   this.authService.authenticationState.subscribe(state => {
  //     if (state) {
  //       this.router.navigate(['studenthome/:email']);
  //     } else {
  //       this.router.navigate(['login']);
  //     }
  //   });
  // }


  logout() {
    this.authService.logout();
  }

}
