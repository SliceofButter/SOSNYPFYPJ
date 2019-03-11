import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IonicStorageModule } from '@ionic/storage';
import { FcmService  } from '../app/services/fcm.service';
import { DbserviceService } from '../app/services/dbservice.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ModalpagePage } from './modalpage/modalpage.page';
import { ModalpagePageModule } from './modalpage/modalpage.module';


var firebaseConfig = 
  {
    apiKey: "AIzaSyDjZ3jcY5FHiHwBAgoMw7vV9oWuWx6rEi8",
    authDomain: "sosnypfypj-96657.firebaseapp.com",
    databaseURL: "https://sosnypfypj-96657.firebaseio.com",
    projectId: "sosnypfypj-96657",
    storageBucket: "sosnypfypj-96657.appspot.com",
    messagingSenderId: "664405918149"
  }
  

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireMessagingModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ModalpagePageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FcmService,
    DbserviceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
