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
  constructor(private route: ActivatedRoute,private router: Router, private authService: AuthenticationService,private storage: Storage) { }

  ngOnInit() {
    // this.route.params.subscribe(data => {
    //   this.email = data;
    // });
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
