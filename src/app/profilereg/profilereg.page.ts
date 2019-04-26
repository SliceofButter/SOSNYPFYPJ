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
  
  ionViewWillEnter() {
    //disables sidemenu on login page
  }

  onSchoolSelected(schoolselected:any){
    console.log(schoolselected)
    if(schoolselected == "SIT")
    {
      this.studentcourse =[
        {name: "Infocomm and Security"},
        {name: "Business Intelligence and Analytics"},
        {name: "Information Technology"},
        {name: "Cybersecurity and Forensics"},
        {name: "Business Informatics"},
        {name: "Financial Informatics"}
      ];
      console.log(this.studentcourse);
    }
    else if(schoolselected == "SBM")
    {
      this.studentcourse =[
        {name: "Business Management"},
        {name: "Accountancy and Finance"},
        {name: "Banking and Finance"},
        {name: "Food and Beverage Business"},
        {name: "Hospitality and Tourism Mangement"},
        {name: "Marketing"},
        {name: "Mass Media Management"},
        {name: "Sport and Wellness Management"},
        {name: "Common Business Programme"}
      ];
    }
    else if(schoolselected == "SHS")
    {
      this.studentcourse =[
        {name: "Nursing"},
        {name: "Oral Health Therapy"},
        {name: "Social Sciences"}
      ];
    }
    else if(schoolselected == "SIDM")
    {
      this.studentcourse =[
        {name: "Animation"},
        {name: "Digital Game Art and Design"},
        {name: "Digital Visual Effects"},
        {name: "Game Development and Technology"},
        {name: "Interaction Design"},
        {name: "Motion Graphics and Broadcast Design"}

      ];
    }
    else if(schoolselected == "SEG")
    {
      this.studentcourse =[
        {name: "Common Engineering"},
        {name: "Aerospace/Electrical/Electronic Programme"},
        {name: "Aerospace/Mechatronics Programme"},
        {name: "Aeronautical and Aerospace Technology"},
        {name: "Aerospace Systems and Management"},
        {name: "Biomedical Engineering"},
        {name: "Digital and Precision Engineering"},
        {name: "Electrical Engineering with Eco-Design"},
        {name: "Electronic Systems"},
        {name: "Engineering with Business"},
        {name: "Multimedia and Infocomm Technology"},
        {name: "Nanotechnology and Materials Science"},
        {name: "Robotics and Mechatronics"}
      ];
    }
    else if(schoolselected == "SDN")
    {
      this.studentcourse =[
        {name: "Architecture"},
        {name: "Industrial Design"},
        {name: "Spatial Design"},
        {name: "Visual Communication"}
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
    if(this.name == null)
    {
      alert('Name cannot be empty.');
    }
    else if(this.adminNo == null)
    {
      alert('Admin number cannot be empty.');
    }
    else if(this.school == null)
    {
      alert('Please select your school.');
    }
    else if(this.course == null)
    {
      alert('Please select your course.');
    }
    else
    {
      
      var name1 = this.name;
      var admin = this.adminNo;
      var school1 = this.school;
      var course1 = this.course;
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
      alert('Account sucessfully created.')
      this.storage.remove("new")
      this.router.navigateByUrl('adminhome')
      
    }

  }

}
