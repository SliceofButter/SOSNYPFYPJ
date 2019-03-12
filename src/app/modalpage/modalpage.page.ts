import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FcmService } from '../services/fcm.service';
import { NavParams, ModalController } from '@ionic/angular'
import { AngularFirestore } from '@angular/fire/firestore';
import { SOS } from '../classes/sos';
import * as firebase from 'firebase';
import { when } from 'q';

@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
})
export class ModalpagePage implements OnInit {

  passedId = null; 
  lat: any;
  lng: any;
  email: any;
  geolocationPosition: any;
  file: File;
  msg:string;
  constructor(private navParams:NavParams,private storage: Storage, private modalController: ModalController,private fbdb: AngularFirestore) {

   }

  ngOnInit() {
    this.passedId = this.navParams.get('custom_id');

  }
  

  changeListener(event) {
    this.file = event.target.files[0];
    console.log(this.file)
  }

 onUpload()
  {
    console.log(this.file)
    console.log("before")
    var reader = new FileReader();
    let taskdone: number =0;
   // reader.onloadend = function(e) {
     // console.log(e.type)
      //var blob = new Blob([reader.result], { type: "image/jpeg" });
      const randomId = Math.random().toString (36).substring(2);
      var ref = firebase.storage().ref().child(randomId.toString());
      var task = ref.put(this.file).then(function(snapshot)
      {
        console.log("Uploaded a blob or file");
        taskdone=taskdone+1;

      });
      setTimeout(() => {
        console.log("Waiting")
        console.log(taskdone);
        if(taskdone > 0)
        {
          console.log("Random ID is SENT from onupload");
          this.getCurrentLocation(randomId);
        }
        else
        {
          console.log("Photo still uploading.");
        }
      }, 6000);


      

    //}

    }

 
  testFunction(lat, lng, mapURL,randomthingy: string)
  {
    if (lat != null || lng != null) {
      if (lat != "" || lng != "") {

        //actual message by student
        const headline = "Emergency help requested from " + this.email;
        
        //date options
        let options: Intl.DateTimeFormatOptions = {
          day: "numeric", month: "long", year: "numeric",
          hour: "2-digit", minute: "2-digit"
      };
      
      let randomstringpassed: string =randomthingy.toString();
      console.log(randomstringpassed);
      var imageURL= firebase.storage().ref().child("randomstringpassed").getDownloadURL();
      var currentDateTime = new Date().toLocaleDateString('en-SG',options);
      var newDate = new Date(Date.parse(Date()));
      var docRef = this.fbdb.collection('sos').doc(this.email+'_'+currentDateTime);
      var sos = new SOS();
      sos.InitializeSOSRecord(headline, newDate,this.email,this.msg,mapURL, imageURL);
      docRef.set(Object.assign({},sos));
      alert("Your help has been sent to safety warrant. Please be calmed while waiting safety warrant look for you.");
    }
  }
  }
  ionViewWillEnter() {
    //call method to check if user is authenticated upon loading this page
    this.CheckIfAuthenticated();
  }


  //this method will check whether the user has authenticated on this page
  CheckIfAuthenticated() {
    var promise = this.storage.get('email');
    Promise.all([promise]).then((arrayOfResults) => {
      console.log(arrayOfResults[0]);
      this.email = String(arrayOfResults[0]);
    });
  }
  getCurrentLocation(randomstring) {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 600000
    };
    let rstring: string =randomstring;
    console.log("Random String received from onupload "+rstring);
        
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position,
          console.log("Lat: " + position.coords.latitude);
          console.log("Lng: " + position.coords.longitude);
          // this.lat = position.coords.latitude;
          // this.lng = position.coords.longitude;
          var googleMapURL = 'https://maps.google.com/maps?q='+position.coords.latitude+','+position.coords.longitude+'&hl=es;z=14&amp;output=embed';
           console.log("inside studentpage.ts");
           console.log("Passed")
           this.testFunction(position.coords.latitude, position.coords.longitude, googleMapURL,rstring);

          
          

        },
        error => {
          switch (error.code) {
            case 1:
              alert('Permission Denied');
              break;
            case 2:
              alert('Position Unavailable');
              break;
            case 3:
              alert('Timeout');
              break;
          }
        },
        { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true }
      );
    };
  }
  closeModal()
  {
    this.modalController.dismiss();
  }

}
