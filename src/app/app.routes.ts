import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArchivedComponent } from './components/archived/archived.component';
import { DetailsComponent } from './components/details/details.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'notes',
    component: DashboardComponent,
  },
  {
    path: 'archived',
    component: ArchivedComponent,
  },
  {
    path: 'notes/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: AddPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'notes',
  },
];
