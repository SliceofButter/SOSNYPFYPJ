import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { Observable } from '../../../node_modules/rxjs';
// import { of } from 'rxjs/Observable/of';
import { Observable , of} from 'rxjs';
import { SOS } from '../classes/sos';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  messagesList;
  constructor(private fbdb: AngularFirestore) { }

  //function to retrieve all emergency messages sent by students (same across all safety warrant)
  // RetrieveAllMessages(){
  //   var docRef = this.fbdb.collection('sos');
  //   return new Promise(resolve => {
  //     docRef.get()
  //   .subscribe(snapshot =>{
  //     snapshot.forEach(doc => {
  //       // console.log(doc.id, '=>', doc.data());
  //       const message = {
  //         userId: doc.id,
  //         message: doc.data()
  //       };
  //       this.messagesList.push(message);
  //       resolve(this.messagesList);
  //     });
      
  //   })
  //   }) 
  // }

  // RetrieveAllMessages(): Observable<any>{
  //   var docRef = this.fbdb.collection('sos');
  //    docRef.get()
  //   .subscribe(snapshot =>{
  //     snapshot.forEach(doc => {
  //       // console.log(doc.id, '=>', doc.data());
  //       const message = {
  //         userId: doc.id,
  //         message: doc.data()
  //       };
  //       this.messagesList.push(message);
  //     });
    
      
  //     console.log("message list size inside subscribe: " + this.messagesList.length);

  //     return of(this.messagesList);

  //   })
  //   return of(this.messagesList);
  // }


  RetrieveAllMessage(): AngularFirestoreCollection<any>{
    // this.messagesList = this.fbdb.collection<any>('sos');
    // console.log("what is this message list 2");
    // console.log(this.messagesList);
    // return this.messagesList;
    //this.fbdb.collection('sos').ref.orderBy("currentDate", "desc");
    return this.fbdb.collection('sos');
  }

  RetrieveAllUsers():AngularFirestoreCollection<any>
  {
    return this.fbdb.collection('userProfile')
  }


}
