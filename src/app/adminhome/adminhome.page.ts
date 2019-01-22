import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.page.html',
  styleUrls: ['./adminhome.page.scss'],
})
export class AdminhomePage implements OnInit {
  email: any;
  constructor(private route: ActivatedRoute,private router: Router,private authService: AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.email = data;
    });

  }

  // ionViewWillEnter(){
  //   //call method to check if user is authenticated upon loading this page
  //   this.CheckIfAuthenticated();
  // }

  //this method will check whether the user has authenticated on this page
  // CheckIfAuthenticated(){
  //   this.authService.authenticationState.subscribe(state => {
  //     if (state) {
  //       this.router.navigate(['adminhome/:email']);
  //     } else {
  //       this.router.navigate(['login']);
  //     }
  //   });
  // }

  // ionViewWillEnter() {
  //   this.CheckIfAdminExist();
  // }
  // CheckIfAdminExist(){
  //   //redirect invalid user back to login page if admin does not exist
  //   console.log("bleh: " + JSON.stringify(this.email));
  //   if(this.email == null || this.email == ""){
  //     this.router.navigate(['/login']);
  //   }
  // }

  logout() {
    this.authService.logout();
  }

}
