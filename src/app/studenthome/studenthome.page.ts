import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-studenthome',
  templateUrl: './studenthome.page.html',
  styleUrls: ['./studenthome.page.scss'],
})
export class StudenthomePage implements OnInit {
  email: any;
  geolocationPosition: any;
  lat:any;
  lng:any;
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private storage: Storage) { }

  ngOnInit() {
    // this.route.params.subscribe(data => {
    //   this.email = data;
    // });
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


  logout() {
    this.authService.logout();
  }

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
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
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
        {maximumAge:600000, timeout:5000, enableHighAccuracy: true}
      );
  };
}
 

}
