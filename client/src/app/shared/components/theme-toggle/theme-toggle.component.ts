import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      (click)="theme.toggle()"
      class="w-14 h-8 rounded-full flex items-center px-1 transition-colors border border-border-base/50 relative bg-surface-hover cursor-pointer"
      [title]="theme.darkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    >
      <div
        class="w-6 h-6 bg-brand rounded-full flex items-center justify-center transition-transform duration-300 shadow-sm absolute"
        [ngClass]="{
          'translate-x-6 text-btn-text': theme.darkMode(),
          'translate-x-0 text-btn-text': !theme.darkMode(),
        }"
      >
        @if (theme.darkMode()) {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        } @else {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        }
      </div>
    </button>
  `,
})
export class ThemeToggleComponent {
  theme = inject(ThemeService);
}
