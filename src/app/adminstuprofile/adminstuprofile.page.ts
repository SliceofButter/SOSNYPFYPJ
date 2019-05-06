import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { DbserviceService } from '../services/dbservice.service';
import { Profile } from '../classes/profile';
import { timeout } from 'q';
import { PicuploadPage} from '../picupload/picupload.page'
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminstuprofile',
  templateUrl: './adminstuprofile.page.html',
  styleUrls: ['./adminstuprofile.page.scss'],
})
export class AdminstuprofilePage implements OnInit {
  user:Observable<Profile>;
  userList:AngularFirestoreDocument<Profile>
  name;
  adminnumber;
  school;
  course;
  photoURL;
  file: File;
  passedUID = null;

  constructor(private dbService: DbserviceService, private fbdb: AngularFirestore,private modalController: ModalController,private route: ActivatedRoute) {
    var userID = this.passedUID
    console.log(userID)
    //firebase.auth().currentUser.uid
    this.userList =this.fbdb.collection('userProfile').doc<Profile>(userID)
    this.user = this.userList.valueChanges()
    this.user.subscribe(res =>{
      this.name = res.name;
      this.adminnumber = res.adminNo;
      this.school = res.school;
      this.course = res.course;
      if(res.photoURL == null)
      {
       this.photoURL = "../../assets/img/user.png"
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
    this.passedUID = this.route.snapshot.paramMap.get('myid');
  }

}
