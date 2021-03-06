import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides} from '@ionic/angular'
import { StudenthomePage } from '../studenthome/studenthome.page';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { trigger, transition, style, state, animate, keyframes} from '@angular/animations'

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
  animations: [
    
    trigger('bounce', [
          state('*', style({
              transform: 'translateX(0)'
          })),
          transition('* => rightSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(-65px)',  offset: 0.3}),
            style({transform: 'translateX(0)',     offset: 1.0})
          ]))),
          transition('* => leftSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(65px)',  offset: 0.3}),
            style({transform: 'translateX(0)',     offset: 1.0})
          ])))
      ])
    ]
    
  })
export class TutorialPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  skipMsg: string = "Skip";
  state: string = 'x';

  constructor(public navCtrl: NavController, public router: Router, public storage: Storage) { }

  

  ngOnInit() {
  }

  //function that allows the user to skip the tutorial if the state of 'tutorialComplete' is set to true
  async skip() {
    await this.storage.set('tutorialComplete', true);
    this.router.navigateByUrl('/studenthome')
  }

  //Checks if the user has reached the end of the tutorial
  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Alright, I got it";
  }

  //Animation for when the user swipes right if the active page's index is higher than the previous and swipes left if vice versa
  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex()) 
      this.state = 'rightSwipe';
    else 
      this.state = 'leftSwipe';
  }

  animationDone() {
    this.state = 'x';
  }


}
