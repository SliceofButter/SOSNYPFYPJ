import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Profile } from '../classes/profile';
import {AngularFireDatabase} from "@angular/fire/database";
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-profilereg',
  templateUrl: './profilereg.page.html',
  styleUrls: ['./profilereg.page.scss'],
})
export class ProfileregPage implements OnInit {
  name:string
  adminNo: string
  school: string
  course: string
  profile = {} as Profile;
  uid;

  constructor(private router: Router,private authService: AuthenticationService, private afDatabase: AngularFirestore, private storage:Storage) { }

  ngOnInit() {
  }

  registerProfile(){
    var name1 = this.name
    var admin = this.adminNo
    var school1 = this.school
    var course1 = this.course
    var newUserCredential = this.storage.get("new")
    Promise.all([newUserCredential]).then((arrayOfResults) => {
      console.log(arrayOfResults[0]);
      this.uid = String(arrayOfResults[0]);
      console.log(name1)
      console.log("test")
    firebase.firestore().doc(`/userProfile/` + this.uid).update({
      name: name1,
      adminNo: admin,
      school: school1,
      course: course1
    })
    })
    this.storage.remove("new")
    this.router.navigateByUrl('login')
  }
}
