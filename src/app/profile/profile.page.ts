import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { DbserviceService } from '../services/dbservice.service';
import { Profile } from '../classes/profile';
import { timeout } from 'q';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user:Observable<Profile>;
  userList:AngularFirestoreDocument<Profile>
  name;
  adminnumber;
  school;
  course;
  photoURL;
  file: File;

  constructor(private dbService: DbserviceService, private fbdb: AngularFirestore) {
    var userID = firebase.auth().currentUser.uid
    this.userList =this.fbdb.collection('userProfile').doc<Profile>(userID)
    this.user = this.userList.valueChanges()
    this.user.subscribe(res =>{
      this.name = res.name;
      this.adminnumber = res.adminNo;
      this.school = res.school;
      this.course = res.course;
      if(res.photoURL == null)
      {
       this.photoURL = "https://personagenerator.com/user-blank.png"
      }
      else
      {
        this.photoURL = res.photoURL
      }
      
    })
    console.log(document.getElementById("test"))
   // document.getElementById("test").innerHTML = this.name
   }

  ngOnInit() {
    console.log(firebase.auth().currentUser.uid)
    console.log("1 New Pic?")
  }

  changeListener(event) {
    this.file = event.target.files[0];
    console.log(this.file)
  }

  upload(){
    console.log(this.file)
    var reader = new FileReader();
    var userID = firebase.auth().currentUser.uid
    var ref = firebase.storage().ref().child(userID)
    var task = ref.put(this.file).then(function(snapshot)
      {
        console.log("Uploaded a file")
      });
      this.timeout() //path in firebase storage
}

timeout(){
  setTimeout(() => {
    var userID = firebase.auth().currentUser.uid
    firebase.storage().ref().child(userID).getDownloadURL().then(function(url){
      console.log("the URL Image is: " + url);
      url;
      let photoURL = this.url
      let imageURL = url
    return imageURL
  }).then((imageURL) => {
    this.fbdb.doc(`userProfile/${userID}`).update({photoURL:imageURL})  })// save url in Firestore database realtime
  },2000);
}


  

}
