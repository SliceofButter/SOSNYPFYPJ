import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { DbserviceService } from '../services/dbservice.service';
import { Observable } from 'rxjs';
import { tap } from '../../../node_modules/rxjs/operators';
import { SOS } from '../classes/sos';
import * as firebase from 'firebase';
import { IonButton } from '@ionic/angular';
import { Button } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  messages:Observable<any[]>;
   messagesList: SOS[] = [];
   lazyList: SOS[] = [];
   pageLimit = 5;
   someTextUrl;
   soslist:AngularFirestoreDocument<SOS>
   headline: string;
  constructor(private dbService: DbserviceService, private fbdb: AngularFirestore,private router: Router) { }

  ngOnInit() {
    this.RetrieveAllMessages();
  }
  ionViewWillEnter(){

  }

accept(message:SOS)
  {
    console.log(message.adminNo+"_"+message.UID)
    var docRef = this.fbdb.collection('attend').doc(message.adminNo+"_"+message.UID)
    docRef.set({
      adminNo: message.adminNo,
      currentDate: message.currentDate,
      desc: message.desc,
      headline: message.headline,
      imageURL: message.imageURL,
      mapURL: message.mapURL,
      UID: message.UID,
      attend:"Attended",
      attendedwho: firebase.auth().currentUser.email
    })
    var docRef2 = this.fbdb.collection('sos').doc(message.adminNo+"_"+message.UID)
    docRef2.delete().then(function(test){
    alert("Help attended.")
    location.reload()
    });
    //console.log(this.messagesList[i])
    //var work = this.messagesList.indexOf(event.target)
    
    //}
    //this.getMessageArray()
    //this.soslist =this.fbdb.collection('sos').doc<SOS>()
  }
  RetrieveAllMessages(){
    console.log("retrievev12");
    // this.dbService.RetrieveAllMessages().then(data => {
    //   console.log(JSON.stringify(data));
      
    // });
    
    // this.dbService.RetrieveAllMessages()
    // .subscribe(data => console.log(data));

      this.dbService.RetrieveAllMessage().valueChanges().subscribe((message) => {
      this.messagesList = message;
      this.getMessageArray(this.messagesList);
    })
    
    
      console.log("Can u please work: ");
      console.log(this.messages);

    // this.messages.forEach(x => console.log(x));
  
  }

  getMessageArray(messages:SOS[]){
    
   

    this.messagesList = messages.sort((a,b)=> { return +new Date(b.currentDate.seconds).getTime() - +new Date(a.currentDate.seconds).getTime(); });

    this.messagesList.slice(0,this.pageLimit).forEach((x)=> {
    this.lazyList.push(x);
    });

    
   
    console.log("sorted listv4");
    console.log(this.messagesList);
  }
  

  loadMoreMessage(event){
    console.log('Begin async operation');

    this.pageLimit++;

    setTimeout(() => {
      
      this.messagesList.slice(this.pageLimit,this.pageLimit+=4).forEach((x)=> {
        this.lazyList.push(x);
        });

      console.log('Async operation has ended');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.messagesList.length == 100) {
        event.target.disabled = true;
      }
      


    }, 500);
  }
  
}



