import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';
import * as cors from 'cors';

const corsHandler = cors({origin: true});


// Import firebase to fix temporary bug in AngularFire
import * as app from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class FcmService {
  token;
  constructor(private toastController: ToastController, private afMessaging: AngularFireMessaging, private fun: AngularFireFunctions, ) {


    // Bind methods to fix temporary bug in AngularFire
    try {
      const _messaging = app.messaging();
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    } catch (e) { }
  }

  //Toast function that displays the message whenever a request is sent for 5 seconds
  async makeToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'dismiss'
    });
    toast.present();
  }


  getPermission() {
    return this.afMessaging.requestToken.pipe(
      tap(token => (this.token = token))
    )
  }

  showMessages() {
    return this.afMessaging.messages.pipe(
      tap(msg => {
        const body: any = (msg as any).notification.body;
        this.makeToast(body);
      })
    );
  }


  sub(topic) {
    this.fun
      .httpsCallable('subscribeToTopic')({ topic, token: this.token })
      .pipe(tap(_ => this.makeToast(`subscribed to ${topic}`)))
      .subscribe();
  }

  unsub(topic) {
    this.fun
      .httpsCallable('unsubscribeFromTopic')({ topic, token: this.token })
      .pipe(tap(_ => this.makeToast(`unsubscribed from ${topic}`)))
      .subscribe();
  }


  // updateDb(message){
  //   console.log("the message is... " + message);
  //   console.log("Updatedb is triggered");
  //   this.fun
  //     .httpsCallable('sendOnFirestoreCreate')({ headline: message })
  //     .pipe(tap(_ => this.makeToast(`stored message ${message}`)))
  //     .subscribe();

  // }

}
