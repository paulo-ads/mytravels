import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Travel } from '../../../../core/models/travel.model';

@Component({
  selector: 'app-travel-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-surface-hover p-4 pb-1.5 rounded-2xl border border-border-base transition group relative flex flex-col h-full"
    >
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-bold text-txt-main flex items-center gap-2.5">
          <span class="text-xl">{{ getFlagEmoji(travel.countryCode) }}</span>
          <span class="truncate">{{ travel.countryName }}</span>
        </h3>

        @if (travel.completed) {
          <span
            class="bg-app-bg/50 text-success text-[10px] uppercase font-bold tracking-widest px-1.5 py-1 rounded-full border border-success/50 flex-shrink-0 mt-0.5 select-none cursor-default"
            >Visited</span
          >
        } @else {
          <span
            class="bg-app-bg/50 text-brand text-[10px] uppercase font-bold tracking-widest px-1.5 py-1 rounded-full border border-brand/50 flex-shrink-0 mt-0.5 select-none cursor-default"
            >Planned</span
          >
        }
      </div>

      @if (travel.startDate || travel.endDate) {
        <div class="flex items-center gap-2 text-xs text-txt-muted mb-3 font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {{ travel.startDate | date: 'MMM d, yyyy' }}
          @if (travel.endDate) {
            - {{ travel.endDate | date: 'MMM d, yyyy' }}
          }
        </div>
      }

      <p class="text-xs font-medium text-txt-muted line-clamp-2 mb-5 flex-1 leading-relaxed">
        {{ travel.notes || 'No notes added.' }}
      </p>

      <div class="mt-auto pt-1.5 border-t border-border-base flex gap-2.5">
        <button
          (click)="onEdit()"
          class="flex items-center gap-2 px-2 py-1 text-[11px] font-bold text-txt-inv bg-brand hover:bg-brand/50 hover:text-txt-muted rounded-full transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
            />
          </svg>
          Edit
        </button>
        <button
          (click)="onDelete()"
          class="flex items-center gap-2 px-2 py-1 text-[11px] font-bold text-txt-inv bg-danger hover:bg-danger/50 hover:text-txt-muted rounded-full transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  `,
})
export class TravelCardComponent {
  @Input({ required: true }) travel!: Travel;
  @Output() editTravel = new EventEmitter<Travel>();
  @Output() deleteTravel = new EventEmitter<number>();
  @Output() toggleStatus = new EventEmitter<Travel>();

  onEdit() {
    this.editTravel.emit(this.travel);
  }

  onDelete() {
    this.deleteTravel.emit(this.travel.id);
  }

  onToggleStatus() {
    this.toggleStatus.emit(this.travel);
  }

  getFlagEmoji(countryCode: string) {
    if (!countryCode) return '📍';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }
}
