import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';
const EMAIL = 'email';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  //used for remember login, it will load this constructor when user opens the app
  //and proceed to check if token is exist, if yes, the user will stay logged in
  //if not, user will need to login
  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
   }

   //check if token exist on storage, if exist, set auth state to true
   checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);

        this.storage.get(EMAIL).then(res => {
          if (res) {
            this.authenticationState.next(true);
          }
        })
      }
    })
  }

  login(jwtIdToken,userEmail) {
    //store the token key got from AWS Cognito into ionic local storage
    return this.storage.set(TOKEN_KEY, jwtIdToken).then(() => {
      this.authenticationState.next(true);

    //store the user email got from AWS Cognito into ionic local storage
      this.storage.set(EMAIL, userEmail).then(() => {
        this.authenticationState.next(true);
      });
    });

    
  }

  logout() {
    //remove the token key got from AWS Cognito into ionic local storage
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);

    //remove the user email got from AWS Cognito into ionic local storage
      this.storage.remove(EMAIL).then(() => {
        this.authenticationState.next(false);
      });
    });
  }

  //function to check if auth state value is true or false
  isAuthenticated() {
    return this.authenticationState.value;
  }

}
