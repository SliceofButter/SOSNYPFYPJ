import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  constructor(private fbdb: AngularFirestore) { }

  //function to retrieve all emergency messages sent by students (same across all safety warrant)
  RetrieveAllMessages(){
    var docRef = this.fbdb.collection('sos');
    var allMessages = docRef.get()
    .subscribe(snapshot =>{
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    })
  }
}
