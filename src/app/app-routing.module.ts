import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { TutorialGuard } from './guards/tutorial.guard';
import { AuthGuard } from './services/user/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'studenthome', canActivate: [TutorialGuard,AuthGuard] , loadChildren: './studenthome/studenthome.module#StudenthomePageModule' },
  { path: 'adminhome', /*canActivate: [AuthGuardService]*/ canActivate: [AuthGuard], loadChildren: './adminhome/adminhome.module#AdminhomePageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'inbox', loadChildren: './inbox/inbox.module#InboxPageModule' },
  { path: 'modalpage', loadChildren: './modalpage/modalpage.module#ModalpagePageModule' },
  { path: 'tutorial', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
  { path: 'disclaimer', loadChildren: './disclaimer/disclaimer.module#DisclaimerPageModule' },
  { path: 'forgetpassword', loadChildren: './forgetpassword/forgetpassword.module#ForgetpasswordPageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'profilereg', loadChildren: './profilereg/profilereg.module#ProfileregPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'picupload', loadChildren: './picupload/picupload.module#PicuploadPageModule' },
  { path: 'studentprofile/:myid', loadChildren: './studentprofile/studentprofile.module#StudentprofilePageModule' },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
