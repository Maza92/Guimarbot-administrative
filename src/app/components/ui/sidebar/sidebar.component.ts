import { Component, Input, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PlanService } from '../../../core/service/plan.service';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  @Input() isVisible: boolean = false;

  constructor(
    public planService: PlanService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  menuItems = [
    { label: 'Planes', icon: 'credit_card', route: '/plan' },
    { label: 'Rutas', icon: 'map', route: '/roadmap' },
    { label: 'Cursos', icon: 'book', route: '/course' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'Log Out', icon: 'logout', route: 'logout' },
  ];

  onMenuClick(item: any) {
    if (item.route === 'logout') {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate([item.route]);
    }
  }
}
