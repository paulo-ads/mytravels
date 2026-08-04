import { Routes } from '@angular/router';
import { AtlasView } from './features/atlas/pages/atlas-view/atlas-view';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { MainComponent } from './layout/main/main';
import { SignupComponent } from './features/auth/signup/signup.component';
import { TravelListComponent } from './features/travels/pages/travel-list/travel-list';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: 'travels', component: TravelListComponent },
      { path: 'atlas', component: AtlasView },
      { path: '', redirectTo: 'travels', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'travels' },
];
