import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { FcmService } from '../app/services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private storage: Storage,
    private fcm: FcmService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // To ensure that notifications are always handled in the foreground when the app is being actively used.
      this.fcm.showMessages().subscribe();


      //this auth service will validate whether the user has logged in for all the pages in the app
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          var promise = this.storage.get('email');
          Promise.all([promise]).then((arrayOfResults) => { //to test whether is the cause of redirecting multiple times for admin
            console.log(arrayOfResults[0]);
            if (String(arrayOfResults[0]).includes('admin')) {
              this.router.navigate(['adminhome']);
            }
            else
            {
              this.router.navigate(['studenthome']);
            }
          });
          //this.router.navigate(['adminhome', 'studenthome']);
        } else {
          this.router.navigate(['login']);
        }
      });

    });
  }
}
