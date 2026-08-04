import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelStateService } from '../../../../core/services/travel-state.service';
import { ModalService } from '../../../../core/services/modal.service';
import { TravelCardComponent } from '../../components/travel-card/travel-card';
import { Travel } from '../../../../core/models/travel.model';

@Component({
  selector: 'app-travel-list',
  standalone: true,
  imports: [CommonModule, TravelCardComponent],
  template: `
    <div class="w-full max-w-[1000px] mx-auto px-4 sm:px-6 pb-8">
      <div
        class="bg-surface rounded-b-2xl border border-border-base shadow-sm overflow-hidden flex flex-col min-h-[75vh]"
      >
        <div class="relative border-b border-border-base p-6 sm:px-6 sm:py-6 overflow-hidden">
          <div class="absolute inset-0 pointer-events-none"></div>

          <div
            class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h1 class="text-3xl font-serif font-bold text-txt-main">Travels</h1>
              <p class="text-txt-muted mt-1 text-sm font-medium">
                Plan future trips and log your past adventures.
              </p>
            </div>

            <button
              (click)="openCreateModal()"
              class="bg-brand text-txt-inv px-5 py-2 rounded-[2rem] enabled:hover:bg-brand/50 enabled:hover:text-txt-muted transition font-bold shadow-sm flex items-center justify-center gap-1.5 text-sm cursor-pointer hover:bg-brand/50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Plan a Trip
            </button>
          </div>
        </div>

        <div class="p-6 sm:p-6 flex-1">
          @if (travelState.isLoading()) {
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              @for (i of [1, 2]; track i) {
                <div
                  class="h-40 bg-surface-hover animate-pulse rounded-2xl border border-border-base"
                ></div>
              }
            </div>
          } @else {
            @if (travelState.plannedTravels().length > 0) {
              <div class="mb-8">
                <h2 class="text-[11px] font-bold text-txt-muted uppercase tracking-widest mb-2">
                  Upcoming Adventures
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  @for (trip of travelState.plannedTravels(); track trip.id) {
                    <app-travel-card
                      [travel]="trip"
                      (editTravel)="handleEdit(trip)"
                      (deleteTravel)="handleDelete(trip.id)"
                    ></app-travel-card>
                  }
                </div>
              </div>
            }

            @if (travelState.completedTravels().length > 0) {
              <div>
                <h2 class="text-[11px] font-bold text-txt-muted uppercase tracking-widest mb-2">
                  Visited
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  @for (trip of travelState.completedTravels(); track trip.id) {
                    <app-travel-card
                      [travel]="trip"
                      (edit)="handleEdit(trip)"
                      (delete)="handleDelete(trip.id)"
                    ></app-travel-card>
                  }
                </div>
              </div>
            }

            @if (travelState.allTravels().length === 0) {
              <div
                class="flex flex-col items-center justify-center text-center py-16 bg-surface-hover rounded-2xl border border-border-base border-dashed mt-4"
              >
                <div class="mb-4 text-txt-muted/60">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    class="w-16 h-16 bi bi-globe2"
                    viewBox="0 0 16 16"
                    stroke-width="1.5"
                  >
                    <path
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"
                    />
                  </svg>
                </div>

                <h3 class="text-base font-bold text-txt-main mb-1 select-none cursor-default">
                  You have no travels
                </h3>
                <p class="text-txt-muted text-sm max-w-sm mx-auto mb-4 select-none cursor-default">
                  You can plan travels in this page or through the Atlas.
                </p>

                <button
                  (click)="openCreateModal()"
                  class="text-brand text-sm font-bold text-shadow-2xs hover:text-txt-muted transition-colors font-bold cursor-pointer"
                >
                  Add your first trip
                </button>
              </div>
            }
          }
        </div>
      </div>
    </div>
  `,
})
export class TravelListComponent implements OnInit {
  travelState = inject(TravelStateService);
  modalService = inject(ModalService);

  ngOnInit() {
    this.travelState.loadTravels();
  }

  openCreateModal() {
    this.modalService.openTravelForm().subscribe((res) => {
      this.travelState.createTravel(res);
    });
  }

  handleEdit(travel: Travel) {
    this.modalService.openTravelForm(travel).subscribe((res) => {
      this.travelState.updateTravel(travel.id, res);
    });
  }

  handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this travel plan?')) {
      this.travelState.deleteTravel(id);
    }
  }
}
