import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InboxPage } from './inbox.page';

const routes: Routes = [
  {
    path: '',
    component: InboxPage,
    children:[
      { 
        path: 'tab1',
         loadChildren: '../tab1/tab1.module#Tab1PageModule' 
        },
      {
         path: 'tab2',
          loadChildren: '../tab2/tab2.module#Tab2PageModule'
         },
    ]
  },
  {
    path: '',
    redirectTo:'/inbox/tab1',
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InboxPage]
})
export class InboxPageModule {}
