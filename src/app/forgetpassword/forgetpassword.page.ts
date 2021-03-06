import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavParams, ModalController } from '@ionic/angular'

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  public resetPasswordForm: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalController: ModalController
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }
  ngOnInit() {}
  //function to allow users to send a request to reset their account password
  resetPassword(resetPasswordForm: FormGroup): void {
    if (!resetPasswordForm.valid) {
      console.log(
        'Form is not valid yet, current value:', resetPasswordForm.value
      );
    } else {
      const email: string = resetPasswordForm.value.email;
      this.authService.resetPassword(email).then(
        async () => {
          const alert = await this.alertCtrl.create({
            message: 'Check your email for a password reset link',
            buttons: [
              {
                text: 'Ok',
                role: 'cancel',
                handler: () => {
                  this.router.navigateByUrl('login');
                },
              },
            ],
          });
          await alert.present();
        },
        async error => {
          const errorAlert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await errorAlert.present();
        }
      );
    }
  }
  //closes the modal upon click
  closeModal()
  {
    this.modalController.dismiss();
  }
}