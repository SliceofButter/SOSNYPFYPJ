import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

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
  { path: 'studenthome', canActivate: [AuthGuardService], loadChildren: './studenthome/studenthome.module#StudenthomePageModule' },
  { path: 'adminhome', canActivate: [AuthGuardService], loadChildren: './adminhome/adminhome.module#AdminhomePageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'inbox', loadChildren: './inbox/inbox.module#InboxPageModule' },  { path: 'modalpage', loadChildren: './modalpage/modalpage.module#ModalpagePageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
