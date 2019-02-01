import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DbserviceService } from '../services/dbservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

   messages;
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

    this.messages = this.dbService.RetrieveAllMessage().valueChanges();
      
      console.log("Can u please work: ");
      console.log(this.messages);

    // this.messages.forEach(x => console.log(x));
    
   

    
  }
  
  
}
