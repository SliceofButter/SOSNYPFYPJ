import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MenuController} from "@ionic/angular";
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrationstudent',
  templateUrl: './registrationstudent.page.html',
  styleUrls: ['./registrationstudent.page.scss'],
})
export class RegistrationstudentPage implements OnInit {
  public signupForm: FormGroup;
  public loading: any;

  constructor(
    public menuCtrl: MenuController,
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
      confirmpassword: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ]
    } );
   }

  ngOnInit() {

  }
  ionViewWillEnter() {
    //disables sidemenu on login page
    this.menuCtrl.enable(false);
  }
  async signupUser(signupForm: FormGroup): Promise<void> {
    const email: string = signupForm.value.email;
    const password: string = signupForm.value.password;
    const confirmpassword: string = signupForm.value.confirmpassword;
    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ', signupForm.value
      );
    }
    else if(password !== confirmpassword){
      alert('Password does not match please try again.')
    } 
    else {
      if(email.substring(7,25) === "@mymail.nyp.edu.sg")
      {
        this.authService.signupUser(email, password).then(
          () => {
            this.loading.dismiss().then(() => {
              this.router.navigateByUrl('profilereg');
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
        this.loading = await this.loadingCtrl.create();
        await this.loading.present();
        this.signupForm.reset()
      }
      else{
        alert('Please use the correct email domain.');
      }

    }
  }
}
