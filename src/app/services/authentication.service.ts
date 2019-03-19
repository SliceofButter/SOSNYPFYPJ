import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const TOKEN_KEY = 'auth-token';
const EMAIL = 'email';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginUser(email:string, password:string): Promise<firebase.auth.UserCredential>
  {
    
     this.storage.set("logged", email).then(() => {
      this.authenticationState.next(true);
    });
    return firebase.auth().signInWithEmailAndPassword(email, password);

  }
  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }
  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  logoutUser():Promise<void> {
    this.storage.remove("logged")
    return firebase.auth().signOut();
  }
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
    this.storage.get("logged").then(res => {
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
    return this.storage.remove("logged").then(() => {
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
