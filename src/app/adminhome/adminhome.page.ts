import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';
import { FcmService } from '../services/fcm.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.page.html',
  styleUrls: ['./adminhome.page.scss'],
})
export class AdminhomePage implements OnInit {
  email: any;
  constructor(private route: ActivatedRoute,private router: Router,private authService: AuthenticationService,private storage: Storage, public fcm: FcmService) { }

  ngOnInit() {
    // this.route.params.subscribe(data => {
    //   this.email = data;
    // });

  }

  getPermission() {
    this.fcm.getPermission().subscribe();
  }



  ionViewWillEnter(){
    //call method to check if user is authenticated upon loading this page
    this.CheckIfAuthenticated();
  }

  //this method will check whether the user has authenticated on this page
  CheckIfAuthenticated(){
    var promise = this.storage.get('email');
    Promise.all([promise]).then((arrayOfResults) => {
      console.log(arrayOfResults[0]);
      this.email = String(arrayOfResults[0]);
    });
  }

  logout() {
    this.authService.logout();
  }

}
