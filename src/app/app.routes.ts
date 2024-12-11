import { Routes } from '@angular/router';
import { PlanComponent } from './components/plan/plan.component';
import { CourseComponent } from './components/course/course.component';

export const routes: Routes = [
  {
    path: '',
    component: PlanComponent,
  },
  {
    path: 'plan',
    component: PlanComponent,
  },
  {
    path: 'course',
    component: CourseComponent,
  },
];
