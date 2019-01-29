import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DbserviceService } from '../services/dbservice.service';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  messages: string[];
  constructor(private dbService: DbserviceService) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.RetrieveAllMessages();
  }


  RetrieveAllMessages(){
    this.dbService.RetrieveAllMessages();
  }
  
  
}
