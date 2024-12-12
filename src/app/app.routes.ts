import { Routes } from '@angular/router';
import { PlanComponent } from './components/plan/plan.component';
import { CourseComponent } from './components/course/course.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LayoutComponent } from './components/ui/layout/layout.component';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'plan',
        pathMatch: 'full',
      },
      { path: 'plan', component: PlanComponent },
      { path: 'course', component: CourseComponent },
      { path: 'roadmap', component: RoadmapComponent },
    ],
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: '/plan',
  },
];
