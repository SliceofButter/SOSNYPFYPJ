import { Component, OnInit } from '@angular/core';
import { CognitoServiceService } from "../../app/cognito-service.service";
import {MenuController} from "@ionic/angular";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  constructor(public CognitoService: CognitoServiceService, public menuCtrl: MenuController,private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //disables sidemenu on login page
    this.menuCtrl.enable(false);
  }

  navigateToStudentHome(user){
    this.router.navigate(["/studenthome",user]);
  }

  navigateToAdminHome(user){
    this.router.navigate(["/adminhome",user]);
  }

  login(){
    this.CognitoService.authenticate(this.email, this.password)
    .then(res =>{
      var userEmail = res["idToken"]["payload"]["email"];
      if(userEmail != null || userEmail != ""){
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
