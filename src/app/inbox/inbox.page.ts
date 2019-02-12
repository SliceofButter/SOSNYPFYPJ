import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DbserviceService } from '../services/dbservice.service';
import { Observable } from 'rxjs';
import { tap } from '../../../node_modules/rxjs/operators';
import { SOS } from '../classes/sos';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

   messages:Observable<any[]>;
   messagesList: SOS[] = [];
  constructor(private dbService: DbserviceService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.RetrieveAllMessages();
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
    
   

    this.messagesList =  messages.sort((a,b)=> { return b.currentDate - a.currentDate });
    console.log(messages);
  }
  
  
}
