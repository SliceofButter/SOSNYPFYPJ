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
  // public appPages = [
  //   {
  //     title: 'Logout',
  //     url: '/logout',
  //     icon: 'log-out'
  //   },
  //   {
  //     title: 'Inbox',
  //     url: '/inbox',
  //     icon: 'mail'
  //   }
    
  // ];

  public appPages = [];
  public email;

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




      //this auth service will validate whether the user has logged in for all the pages in the app
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          var promise = this.storage.get('logged');
          Promise.all([promise]).then((arrayOfResults) => { //to test whether is the cause of redirecting multiple times for admin
            console.log(arrayOfResults[0]);
            this.email = String(arrayOfResults[0]);
            if (String(arrayOfResults[0]).includes('admin')) {
              // To ensure that notifications are always handled in the foreground when the app is being actively used.
              // for admin
              this.fcm.showMessages().subscribe();
              this.fcm.getPermission().subscribe();

              if(this.fcm.token == null || this.fcm.token == ""){
                
              }
              else
              {
                //the fcm.token must not be empty in order to subscribe to 'sos' topic.
                this.fcm.sub('sos');
              }

              this.appPages = [
                  {
                    title: 'Logout',
                    url: '/logout',
                    icon: 'log-out'
                  },
                  {
                    title: 'Inbox',
                    url: '/inbox',
                    icon: 'mail'
                  },
                  {
                    title: 'Register an Account',
                    url: '/registration',
                    icon: 'person'
                  }
                  
                ];
              this.router.navigate(['adminhome']);
            }
            else {
             
              this.appPages = [
                {
                  title: 'Logout',
                  url: '/logout',
                  icon: 'log-out'
                },
                {
                  title: 'Home',
                  url: '/studenthome',
                  icon: 'home'
                },
                {
                  title: 'Disclaimer',
                  url: '/disclaimer',
                  icon: 'alert'
                }
                ,
                {
                  title: 'Profile',
                  url: '/profile',
                  icon: 'person'
                }
              ];
                  this.router.navigate(['studenthome'])
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
