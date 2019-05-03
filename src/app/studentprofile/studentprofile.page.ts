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
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.page.html',
  styleUrls: ['./studentprofile.page.scss'],
})
export class StudentprofilePage implements OnInit {
  user:Observable<Profile>;
  userList:AngularFirestoreDocument<Profile>
  name;
  adminnumber;
  school;
  course;
  photoURL;
  myId = null;
  constructor(private activatedRoute: ActivatedRoute,private fbdb: AngularFirestore) { }

 ngOnInit() {
   this.myId = this.activatedRoute.snapshot.paramMap.get('myid');
   this.userList =this.fbdb.collection('userProfile').doc<Profile>(this.myId)
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
 }

}
