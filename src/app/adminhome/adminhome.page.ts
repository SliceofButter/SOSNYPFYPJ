import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.page.html',
  styleUrls: ['./adminhome.page.scss'],
})
export class AdminhomePage implements OnInit {
  email: any;
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.email = data;
    });
    
  }

  ionViewWillEnter() {
    this.CheckIfAdminExist();
  }
  CheckIfAdminExist(){
    //redirect invalid user back to login page if admin does not exist
    console.log("bleh: " + JSON.stringify(this.email));
    if(this.email == null || this.email == ""){
      this.router.navigate(['/login']);
    }
  }

}
