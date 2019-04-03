import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { DbserviceService } from '../services/dbservice.service';
import { Observable } from 'rxjs';
import { tap } from '../../../node_modules/rxjs/operators';
import { SOS } from '../classes/sos';
import * as firebase from 'firebase';
import { IonButton } from '@ionic/angular';
import { Button } from 'protractor';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  messages:Observable<any[]>;
  messagesList: SOS[] = [];
  lazyList: SOS[] = [];
  pageLimit = 5;
  someTextUrl;
  soslist:AngularFirestoreDocument<SOS>
  headline: string;
  constructor(private dbService: DbserviceService, private fbdb: AngularFirestore) { }

  ngOnInit() {
    this.RetrieveAllMessages();
  }

  ionViewWillEnter(){
    //this.RetrieveAllMessages();

  }

  RetrieveAllMessages(){
    console.log("retrievev12");

    
     this.dbService.RetrieveAllMessageA().valueChanges().subscribe((message) => {
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
