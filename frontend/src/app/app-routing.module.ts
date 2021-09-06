import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPostComponent } from './post/list-post/list-post.component';
import { SavePostComponent } from './post/save-post/save-post.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'savePost',
    component: SavePostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listPost',
    component: ListPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
