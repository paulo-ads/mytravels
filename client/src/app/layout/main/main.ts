import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div>
      <app-navbar></app-navbar>

      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class MainComponent {}
