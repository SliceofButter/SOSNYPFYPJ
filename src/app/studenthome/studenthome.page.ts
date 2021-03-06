import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FcmService } from '../services/fcm.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { SOS } from '../classes/sos';
import { Profile } from '../classes/profile';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { NavController, ModalController } from '@ionic/angular';
import { ModalpagePage} from '../modalpage/modalpage.page'

@Component({
  selector: 'app-studenthome',
  templateUrl: './studenthome.page.html',
  styleUrls: ['./studenthome.page.scss'],
})
export class StudenthomePage implements OnInit {
  value = 0;
  email: any;
  geolocationPosition: any;
  lat: any;
  lng: any;
  db: any;
  ref: any;
  task: any;
 // someTextUrl;
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private storage: Storage, private fbdb: AngularFirestore, private fcm: FcmService, private afStorage: AngularFireStorage,private modalController: ModalController) {
//this.getSomeText();
  }



  //Function that runs when the page is intialized for the first time
  ngOnInit() {
    // this.route.params.subscribe(data => {
    //   this.email = data;
    // });
    console.log(firebase.auth().currentUser.uid)
  }

  //Function to open up the modal for Modalpage(which is the detailed request)
  async openModal()
  {
    const modal = await this.modalController.create({
      component:ModalpagePage,
      componentProps: {
        custom_id: this.value
      }
    });
    modal.present();
    
  }

  //getSomeText(){
    //console.log(firebase.storage().ref().child('112nbemjzhw').getDownloadURL().then(response => this.someTextUrl = response))
    //firebase.storage().ref().child('112nbemjzhw').getDownloadURL()
   // .then(response => this.someTextUrl = response)
   // .catch(error => console.log('error', error))
  // }


  /*onfileChanged(event)
  {
    const file = event.target.files[0];
  }

  onUpload(event)
  {
    console.log("before")
    var reader = new FileReader();
   // reader.onloadend = function(e) {
     // console.log(e.type)
      //var blob = new Blob([reader.result], { type: "image/jpeg" });
      const randomId = Math.random().toString (36).substring(2);
      var ref = firebase.storage().ref(randomId)
      var task = ref.put(event.target.files[0]);
      console.log(task)
    //}

    }
  */
 
//Function that gets the langtitude and longtitude of the user's device on the map as well as the time and date that they click on the button before sending the request into Firebase database
  customMessage(lat, lng, mapURL) {
    if (lat != null || lng != null) {
      if (lat != "" || lng != "") {

        //actual message by student
        const headline = "Emergency help requested from " + this.email;
        
        //date options
        let options: Intl.DateTimeFormatOptions = {
          day: "numeric", month: "long", year: "numeric",
          hour: "2-digit", minute: "2-digit"
      };
      
        //current date time
        var currentDateTime = new Date().toLocaleDateString('en-SG',options);
      var newDate = new Date(Date.parse(Date()));
      var testing = this.storage.get('logged');
    Promise.all([testing]).then((arrayOfResults) => {
      console.log(arrayOfResults[0]);
      this.email = String(arrayOfResults[0]);
      console.log(this.email + " 2")
      const headline = "Emergency help requested from " + this.email;
      var localemail = this.email
      var UID = Math.random().toString (36).substring(2);
      var mode = this.modalController
      var userID = firebase.auth().currentUser.uid
      var userList =this.fbdb.collection('userProfile').doc<Profile>(userID)
      userList.valueChanges().subscribe(res =>{

      
        var docRef = this.fbdb.collection('sos').doc(localemail+'_'+UID);
        docRef.set({
          name: res.name,
          adminNo: localemail,
          currentDate: newDate,
          desc: null,
          headline: headline,
          imageURL: null,
          mapURL: mapURL,
          UID: UID,
          studID: userID
        })
        alert("Your help has been sent to safety warrant. Please be calmed while waiting safety warrant look for you.")
      })
    })
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

  //logout function using service
  logout() {
    this.authService.logout();
  }


  //core function to get user current location via browser since this is a PWA app.
  getCurrentLocation() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 600000
    };

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
          this.customMessage(position.coords.latitude, position.coords.longitude, googleMapURL);

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
  


}
