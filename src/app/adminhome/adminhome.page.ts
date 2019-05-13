import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { FcmService } from '../services/fcm.service';
import { SOS } from '../classes/sos';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { DbserviceService } from '../services/dbservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.page.html',
  styleUrls: ['./adminhome.page.scss'],
})
export class AdminhomePage implements OnInit {
  email: any;
  alertPermission: any;
  messages:Observable<any[]>;
  messages2:Observable<any[]>;
  messagesList: SOS[] = [];
  messagesList2: SOS[] = [];
  lazyList: SOS[] = [];
  soslist:AngularFirestoreDocument<SOS>;
  constructor(private route: ActivatedRoute,private router: Router,private authService: AuthenticationService,private storage: Storage, public fcm: FcmService,private dbService: DbserviceService, private fbdb: AngularFirestore) { }

  ngOnInit() {
    console.log("Testing Counter")
    this.RetrieveAllMessages();
    this.RetrieveAllMessages2();
  }
  RetrieveAllMessages(){
    console.log("Retrieving ALL Messages");
     this.dbService.RetrieveAllMessage().valueChanges().subscribe((message) => {
      this.messagesList = message;
      this.getMessageArray(this.messagesList);
    })
      console.log(this.messages);

    // this.messages.forEach(x => console.log(x));
  
  }
  
  getMessageArray(messages:SOS[]){
    this.messagesList = messages.sort((a,b)=> { return +new Date(b.currentDate.seconds).getTime() - +new Date(a.currentDate.seconds).getTime(); });
    console.log("Getting the message array");
    console.log(this.messagesList);
  }
  getPermission() {
    //this.fcm.getPermission().subscribe();
    this.fcm.sub('sos');
  }
  
  isAlertAvailale(){
    //if permission token does not exist
    if(this.fcm.token == null || this.fcm.token == ""){
      this.alertPermission = 0;
    }
    else
    {
      this.alertPermission = 1;
      this.getPermission();
    }
  }


  ionViewWillEnter(){
    //call method to check if user is authenticated upon loading this page
    this.CheckIfAuthenticated();
    //check if alert is available
    // this.isAlertAvailale();
  }

  //this method will check whether the user has authenticated on this page
  CheckIfAuthenticated(){
    var promise = this.storage.get('email');
    Promise.all([promise]).then((arrayOfResults) => {
      console.log(arrayOfResults[0]);
      this.email = String(arrayOfResults[0]);
    });
  }
  RetrieveAllMessages2(){
    console.log("retrievev12");
     this.dbService.RetrieveAllMessageA().valueChanges().subscribe((message2) => {
      this.messagesList2 = message2;
      this.getMessageArray2(this.messagesList2);
      console.log(this.messages2)
    })
  }
  getMessageArray2(messages2:SOS[]){
    this.messagesList2 = messages2.sort((a,b)=> { return +new Date(b.currentDate.seconds).getTime() - +new Date(a.currentDate.seconds).getTime(); });
  }


  logout() {
    this.authService.logout();
  }

}
