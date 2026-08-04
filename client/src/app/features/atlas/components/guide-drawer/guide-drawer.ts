import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
  signal,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../core/services/api.service';
import { GuidePayload } from '../../../../core/models/guide.model';
import { ModalService } from '../../../../core/services/modal.service';
import { TravelStateService } from '../../../../core/services/travel-state.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Travel } from '../../../../core/models/travel.model';

@Component({
  selector: 'app-guide-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="absolute -bottom-7.5 -left-1 -right-1 bg-surface/95 backdrop-blur-xl border-t border-x border-border-base rounded-b-[1.8rem] flex flex-col z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] will-change-transform"
      style="height: 99%;"
      [style.transform]="getTransform()"
      [style.transition]="isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.3, 1, 0.3, 1)'"
    >
      <div
        class="h-[3rem] flex flex-col items-center justify-center cursor-grab active:cursor-grabbing px-6 bg-transparent transition-colors rounded-t-[1.8rem] border-b border-border-base/50 shrink-0"
        (mousedown)="onDragStart($event)"
        (touchstart)="onDragStart($event)"
      >
        <div class="-mb-1 absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7em"
            height="4em"
            class="bi bi-grip-horizontal fill-brand"
            viewBox="0 0 16 16"
          >
            <path
              d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
            />
          </svg>
        </div>

        <div class="w-full flex justify-between items-center select-none pointer-events-none">
          <h2 class="font-bold text-txt-main text-lg truncate">
            @if (guide()) {
              {{ guide()!.country.name }}
              <span class="text-sm font-medium text-txt-muted ml-1">{{
                guide()!.country.region
              }}</span>
            } @else {
              <span class="text-txt-muted text-base">Select a destination for your guide.</span>
            }
          </h2>

          @if (guide()) {
            <span
              class="text-[10px] font-bold text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-full uppercase tracking-wider"
            >
              Guide
            </span>
          }
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-6 sm:p-8" [class.overflow-hidden]="!isOpen">
        @if (isLoading()) {
          <div class="animate-pulse space-y-6">
            <div class="flex items-center gap-4">
              <div class="w-20 h-14 bg-surface-hover rounded-lg"></div>
              <div class="space-y-3 flex-1">
                <div class="h-6 bg-surface-hover rounded w-1/2"></div>
                <div class="h-4 bg-surface-hover rounded w-1/3"></div>
              </div>
            </div>
            <div class="h-32 bg-surface-hover rounded-2xl"></div>
            <div class="h-32 bg-surface-hover rounded-2xl"></div>
          </div>
        } @else if (error()) {
          <div class="text-center py-10">
            <span class="text-4xl block mb-3 ml-[47%] flex justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="w-12 h-12 bi bi-emoji-frown-fill"
                viewBox="0 0 16 16"
                stroke-width="1.5"
              >
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-2.715 5.933a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"
                />
              </svg>
            </span>
            <h3 class="text-txt-main font-bold text-lg">Data Unavailable</h3>
            <p class="text-txt-muted text-sm mt-1">We couldn't fetch the guide for this region.</p>
          </div>
        } @else if (guide()) {
          <div class="space-y-8 pb-4">
            <div
              class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-surface-hover p-4 sm:p-5 rounded-2xl border border-brand shadow-sm"
            >
              <div class="flex gap-4 items-center min-w-0">
                <img
                  [src]="guide()!.country.flagUrl"
                  alt="Flag"
                  class="w-20 h-auto shadow-sm border border-border-base rounded-md flex-shrink-0"
                />

                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h1 class="text-2xl font-serif font-bold text-txt-main truncate">
                      {{ guide()!.country.name }}
                    </h1>
                    <span
                      class="text-[9px] font-bold text-txt-muted bg-surface px-2 py-0.5 rounded border border-brand flex-shrink-0 uppercase tracking-wider shadow-sm"
                    >
                      {{ guide()!.country.countryCode }}
                    </span>
                  </div>

                  <p class="text-txt-muted text-sm font-medium truncate">
                    Capital: <span class="text-txt-main">{{ guide()!.country.capital }}</span>
                  </p>
                  <p class="text-txt-muted text-sm font-medium mt-0.5">
                    Population:
                    <span class="text-txt-main"
                      >{{ (guide()!.country.population / 1000000).toFixed(1) }}M</span
                    >
                  </p>
                </div>
              </div>

              <button
                (click)="planTrip()"
                [disabled]="!guide() || isLoading()"
                class="w-full sm:w-auto bg-brand text-btn-text font-bold py-3 px-2 rounded-2xl hover:bg-brand/50 hover:text-txt-muted transition-colors shadow-sm disabled:opacity-50 flex justify-center items-center gap-2 flex-shrink-0 cursor-pointer"
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
                Plan a trip to {{ guide() ? guide()!.country.name : 'this country' }}
              </button>
            </div>

            <div>
              <h3 class="font-bold text-txt-muted text-xs uppercase tracking-widest mb-4">
                Top Destinations
              </h3>

              <div class="space-y-4">
                @for (city of guide()!.cities; track city.name) {
                  <div
                    class="bg-surface-hover rounded-2xl overflow-hidden border border-border-base shadow-sm flex flex-row h-44 sm:h-82"
                  >
                    <div
                      class="w-3/5 sm:w-4/5 relative h-full flex-shrink-0 group/carousel bg-black"
                    >
                      @if (city.photos && city.photos.length > 0) {
                        <img
                          [src]="city.photos[getPhotoIndex(city.name)].url"
                          [alt]="city.name"
                          class="w-full h-full object-cover transition-opacity duration-300"
                        />

                        <div
                          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40 pointer-events-none"
                        ></div>

                        @if (city.photos.length > 1) {
                          <div
                            class="absolute top-2 right-2 bg-surface/70 backdrop-blur-md text-txt-main text-[9px] font-bold px-2 py-1 rounded-full border border-border-base shadow-sm pointer-events-none transition-colors"
                          >
                            {{ getPhotoIndex(city.name) + 1 }} / {{ city.photos.length }}
                          </div>
                        }

                        @if (city.photos.length > 1) {
                          <button
                            (click)="prevPhoto(city.name, city.photos.length)"
                            class="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-surface/70 hover:bg-surface backdrop-blur-md text-txt-main rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-90 transition-all border border-brand shadow-md"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="m15 18-6-6 6-6" />
                            </svg>
                          </button>

                          <button
                            (click)="nextPhoto(city.name, city.photos.length)"
                            class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-surface/70 hover:bg-surface backdrop-blur-md text-txt-main rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-90 transition-all border border-brand shadow-md"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </button>
                        }

                        <div class="absolute bottom-2 left-3 pr-2">
                          <a
                            [href]="
                              city.photos[getPhotoIndex(city.name)].authorProfile +
                              '?utm_source=myTravels&utm_medium=referral'
                            "
                            target="_blank"
                            class="text-[9px] sm:text-[10px] text-white/70 hover:text-white hover:underline drop-shadow-md truncate block"
                          >
                            Photo by {{ city.photos[getPhotoIndex(city.name)].authorName }}
                          </a>
                        </div>
                      } @else {
                        <div
                          class="w-full h-full bg-app-bg flex items-center justify-center border-r border-border-base"
                        >
                          <span class="text-txt-muted text-xs font-medium">No image available</span>
                        </div>
                      }
                    </div>

                    <div
                      class="w-2/5 sm:w-1/4 p-3 sm:p-5 flex flex-col justify-between bg-surface-hover border-l border-border-base"
                    >
                      <div>
                        <h4
                          class="font-bold text-txt-main text-base sm:text-xl leading-tight line-clamp-2"
                        >
                          {{ city.name }}
                        </h4>
                        <p class="text-xs text-txt-muted font-medium mt-1">
                          Population: {{ (city.population / 1000).toFixed(0) }}k
                        </p>
                      </div>

                      @if (city.weather) {
                        <div
                          class="flex items-center gap-2 mt-auto bg-surface px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-brand w-full overflow-hidden"
                        >
                          <img
                            [src]="city.weather.icon"
                            alt="Weather"
                            class="w-7 h-7 sm:w-10 sm:h-10 drop-shadow-sm -ml-1 flex-shrink-0"
                          />

                          <div class="flex flex-col min-w-0">
                            <span class="font-bold text-txt-main text-sm sm:text-base leading-none"
                              >{{ city.weather.tempC }}°C</span
                            >
                            <span
                              class="text-[9px] sm:text-xs text-txt-muted font-medium truncate mt-0.5"
                              >{{ city.weather.condition }}</span
                            >
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class GuideDrawerComponent implements OnChanges {
  @Input() countryCode: string | number | undefined = undefined;
  @Output() drawerClosed = new EventEmitter<void>();

  api = inject(ApiService);
  modalService = inject(ModalService);
  travelState = inject(TravelStateService);
  toast = inject(ToastService);

  isOpen = false;
  isDragging = false;
  photoIndices: Record<string, number> = {};
  private startY = 0;
  private currentY = 0;

  isLoading = signal(false);
  error = signal(false);
  guide = signal<GuidePayload | null>(null);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['countryCode']) {
      const code = changes['countryCode'].currentValue;
      if (code) {
        this.fetchGuide(code);
        this.isOpen = true;
      }
    }
  }

  planTrip() {
    const currentGuide = this.guide();
    if (!currentGuide) return;

    this.modalService
      .openTravelForm({
        countryCode: currentGuide.country.countryCode,
      } as unknown as Travel)
      .subscribe((res) => {
        this.travelState.createTravel(res);
        this.toast.success('Trip added to your Travels!');
        this.isOpen = false;
      });
  }

  getPhotoIndex(cityName: string): number {
    return this.photoIndices[cityName] || 0;
  }

  nextPhoto(cityName: string, totalPhotos: number) {
    const current = this.getPhotoIndex(cityName);
    this.photoIndices[cityName] = (current + 1) % totalPhotos;
  }

  prevPhoto(cityName: string, totalPhotos: number) {
    const current = this.getPhotoIndex(cityName);
    this.photoIndices[cityName] = (current - 1 + totalPhotos) % totalPhotos;
  }

  getTransform(): string {
    if (this.isOpen) {
      const y = this.isDragging ? Math.max(0, this.currentY) : 0;
      return `translateY(${y}px)`;
    } else {
      const y = this.isDragging ? Math.min(0, this.currentY) : 0;
      return `translateY(calc(100% - 4.5rem + ${y}px))`;
    }
  }

  onDragStart(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startY = this.getClientY(event);
    this.currentY = 0;
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    const clientY = this.getClientY(event);
    this.currentY = clientY - this.startY;
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;

    if (this.isOpen && this.currentY > 50) {
      this.isOpen = false;
    } else if (!this.isOpen && this.currentY < -50) {
      this.isOpen = true;
    } else if (!this.isDragging && this.currentY === 0) {
      this.isOpen = !this.isOpen;
    }

    this.currentY = 0;
  }

  private fetchGuide(code: string) {
    this.isLoading.set(true);
    this.error.set(false);
    this.guide.set(null);
    this.photoIndices = {};

    this.api.getGuide(code).subscribe({
      next: (data) => {
        this.guide.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set(true);
        this.isLoading.set(false);
      },
    });
  }

  private getClientY(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
  }
}
