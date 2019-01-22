import { Component, OnInit } from '@angular/core';
import { CognitoServiceService } from "../../app/cognito-service.service";
import {MenuController} from "@ionic/angular";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  constructor(public CognitoService: CognitoServiceService, public menuCtrl: MenuController,private router: Router,private authService: AuthenticationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //disables sidemenu on login page
    this.menuCtrl.enable(false);
  }
  //this method will check whether the user has authenticated on this page
  navigateToStudentHome(user){
    this.authService.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['/studenthome']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  //this method will check whether the user has authenticated on this page
  navigateToAdminHome(user){
    this.authService.authenticationState.subscribe(state => {
      if (state) {
        this.router.navigate(['/adminhome']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  login(){
    this.CognitoService.authenticate(this.email, this.password)
    .then(res =>{
      var userEmail = res["idToken"]["payload"]["email"];
      var jwtIdToken = res["idToken"]["jwtToken"];
      
      if(jwtIdToken != null || jwtIdToken != ""){
        //store token in ionic local storage to check authentication for future use
        this.authService.login(jwtIdToken);
        //check if it's admin
        if(JSON.stringify(userEmail).includes('admin')){
          // alert('I am an admin and my email is ' + userEmail);
          //admin proceed to their respective page
          
          this.navigateToAdminHome(userEmail);
        }
        else
        {
          //student proceed to their respective page
          // alert('I am a student and my email is ' + userEmail);
          this.navigateToStudentHome(userEmail);
        }
      }
    }, err =>{
      alert("Invalid Email/Password. Please try again.");
    });
  }

}
