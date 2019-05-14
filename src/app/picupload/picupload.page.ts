import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { DbserviceService } from '../services/dbservice.service';
import { Profile } from '../classes/profile';
import { timeout } from 'q';
import { NavParams, ModalController } from '@ionic/angular'

@Component({
  selector: 'app-picupload',
  templateUrl: './picupload.page.html',
  styleUrls: ['./picupload.page.scss'],
})
export class PicuploadPage implements OnInit {
  file: File;
  img1: any;

  constructor(private dbService: DbserviceService, private fbdb: AngularFirestore, private modal: ModalController) { }

  //Function runs when page is intialized for the first time
  ngOnInit() {
    console.log(firebase.auth().currentUser.uid)
  }

  //Allows user to upload an image onto a fileReader
  changeListener(event) {
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
      let fileList: FileList = event.target.files;  
      this.file = fileList[0];
      console.log(this.file);
  }

  //Function uploads the image the user chooses into Firebase storage
  upload(){
    console.log(this.file)
    var mode = this.modal
    var reader = new FileReader();
    var userID = firebase.auth().currentUser.uid
    var ref = firebase.storage().ref().child('userpic/'+userID)
    var task = ref.put(this.file).then(function(snapshot)
      {
        console.log("Uploaded a file")
      });
      this.timeout() //path in firebase storage
      mode.dismiss();
}

//Timeout function that delays the upload function by 2 seconds to grab  the downloadURL of the image from firebase
timeout(){
  setTimeout(() => {
    var userID = firebase.auth().currentUser.uid
    firebase.storage().ref().child('userpic/'+userID).getDownloadURL().then(function(url){
      console.log("the URL Image is: " + url);
      url;
      let photoURL = this.url
      let imageURL = url
    return imageURL
  }).then((imageURL) => {
    this.fbdb.doc(`userProfile/${userID}`).update({photoURL:imageURL})  })// save url in Firestore database realtime
  },2000);
}

//function that closes the Modal when clicked
closeModal()
{
  this.modal.dismiss();
}


}
