import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Profile } from '../classes/profile';
import {AngularFireDatabase} from "@angular/fire/database";
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { StudentCourse } from '../classes/studentcourse';





@Component({
  selector: 'app-profilereg',
  templateUrl: './profilereg.page.html',
  styleUrls: ['./profilereg.page.scss'],
})
export class ProfileregPage implements OnInit {
  name:string;
  adminNo: string;
  school: any;
  course: string;
  profile = {} as Profile;
  studentcourse:StudentCourse[];
  uid;

  constructor(private router: Router,private authService: AuthenticationService, private afDatabase: AngularFirestore, private storage:Storage) { }

  ngOnInit() {
    console.log("Final Test")
  }

  onSchoolSelected(schoolselected:any){
    console.log(schoolselected)
    if(schoolselected == "SIT")
    {
      this.studentcourse =[
        {name: "Diploma in Infocomm and Security"},
        {name: "Diploma in Business Intelligence and Analytics"},
        {name: "Diploma in Information Technology"},
        {name: "Diploma in Cybersecurity and Forensics"},
        {name: "Diploma in Business Informatics"},
        {name: "Diploma in Financial Informatics"}
      ];
      console.log(this.studentcourse);
    }
    else if(schoolselected == "SBM")
    {
      this.studentcourse =[
        {name: "Diploma in Business Management"},
        {name: "Diploma in Accountancy and Finance"},
        {name: "Diploma in Banking and Finance"},
        {name: "Diploma in Food and Beverage Business"},
        {name: "Diploma in Hospitality and Tourism Mangement"},
        {name: "Diploma in Marketing"},
        {name: "Diploma in Mass Media Management"},
        {name: "Diploma in Sport and Wellness Management"},
        {name: "Diploma in Common Business Programme"}
      ];
    }
    else if(schoolselected == "SHS")
    {
      this.studentcourse =[
        {name: "Diploma in Nursing"},
        {name: "Diploma in Oral Health Therapy"},
        {name: "Diploma in Social Sciences"}
      ];
    }
    else if(schoolselected == "SIDM")
    {
      this.studentcourse =[
        {name: "Diploma in Animation"},
        {name: "Diploma in Digital Game Art and Design"},
        {name: "Diploma in Digital Visual Effects"},
        {name: "Diploma in Game Development and Technology"},
        {name: "Diploma in Interaction Design"},
        {name: "Diploma in Motion Graphics and Broadcast Design"}

      ];
    }
    else if(schoolselected == "SEG")
    {
      this.studentcourse =[
        {name: "Diploma in Common Engineering"},
        {name: "Diploma in Aerospace/Electrical/Electronic Programme"},
        {name: "Diploma in Aerospace/Mechatronics Programme"},
        {name: "Diploma in Aeronautical and Aerospace Technology"},
        {name: "Diploma in Aerospace Systems and Management"},
        {name: "Diploma in Biomedical Engineering"},
        {name: "Diploma in Digital and Precision Engineering"},
        {name: "Diploma in Electrical Engineering with Eco-Design"},
        {name: "Diploma in Electronic Systems"},
        {name: "Diploma in Engineering with Business"},
        {name: "Diploma in Multimedia and Infocomm Technology"},
        {name: "Diploma in Nanotechnology and Materials Science"},
        {name: "Diploma in Robotics and Mechatronics"}
      ];
    }
    else if(schoolselected == "SDN")
    {
      this.studentcourse =[
        {name: "Diploma in Architecture"},
        {name: "Diploma in Industrial Design"},
        {name: "Diploma in Spatial Design"},
        {name: "Diploma in Visual Communication"}
      ];
    }
    else
    {
      this.studentcourse=[
        {name: "Please Select a course"}
      ];
    }
    

  }

  registerProfile(){
    var name1 = this.name
    var admin = this.adminNo
    var school1 = this.school;
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
