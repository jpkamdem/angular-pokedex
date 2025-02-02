import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-avigation',
  imports: [],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  navItems = ['about', 'home'];
}
