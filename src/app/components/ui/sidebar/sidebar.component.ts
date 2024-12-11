import { Component, Input, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

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
export class SidebarComponent {
  @Input() isVisible = true;
  menuItems = [
    { label: 'Planes', icon: 'credit_card' },
    { label: 'E-Commerce', icon: 'shopping_cart' },
    { label: 'Inbox', icon: 'inbox', badge: 14 },
    { label: 'Profile', icon: 'person' },
    { label: 'Settings', icon: 'settings' },
    { label: 'Log Out', icon: 'logout' },
  ];

  onMenuClick(item: any) {
    console.log('Menu item clicked:', item);
    // Manejar la navegación o acciones aquí
  }
}
