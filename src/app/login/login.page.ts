import { Component, OnInit } from '@angular/core';
import { CognitoServiceService } from "../../app/cognito-service.service";
import {MenuController} from "@ionic/angular";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ForgetPasswordPage} from '../forgetpassword/forgetpassword.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public appPages = [];
  email: string;
  password: string;
  countries:any;
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;
  constructor(public CognitoService: CognitoServiceService, public menuCtrl: MenuController,private storage:Storage,private router: Router,private authService: AuthenticationService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private formBuilder: FormBuilder,private modalController: ModalController,) { 
    this.loginForm = this.formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  ngOnInit() {
    console.log("Testing Pic Folder - 24")
  }



  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
  
      const email = loginForm.value.email;
      const password = loginForm.value.password;
  
      this.authService.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            if(email.substring(7,25) === "@mymail.nyp.edu.sg")
            {
              this.storage.set("logged", email).then(() => {
                this.authService.authenticationState.next(true);
              });
                  this.router.navigate(['studenthome'])
            }
            else if(email.substring(8) == "@test.nyp.edu.sg")
            {
              this.storage.set("logged", email).then(() => {
                this.authService.authenticationState.next(true);
              });
            this.router.navigate(['adminhome']);
            }
            else
            {
              alert("This is an invalid account")
            }
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
    }
  }
  ionViewWillEnter() {
    //disables sidemenu on login page
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave(){
    console.log('Leaving login Page');
    this.menuCtrl.enable(true);
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

  async openModal()
  {
    const modal = await this.modalController.create({
      component:ForgetPasswordPage,
      componentProps: {
      }
    });
    modal.present();
  }
  login(){
    this.CognitoService.authenticate(this.email, this.password)
    .then(res =>{
      var userEmail = res["idToken"]["payload"]["email"];
      var jwtIdToken = res["idToken"]["jwtToken"];
      
      if(jwtIdToken != null || jwtIdToken != ""){
        //store token and user email in ionic local storage to check authentication for auto login
        this.authService.login(jwtIdToken,userEmail);
        //check if it's admin
        if(JSON.stringify(userEmail).includes('admin')){
          //admin proceed to their respective page
          //this.navigateToAdminHome(userEmail);
        }
        else
        {
          //student proceed to their respective page
          //this.navigateToStudentHome(userEmail);
        }
      }
    }, err =>{
      alert("Invalid Email/Password. Please try again.");
    });
  }

}
