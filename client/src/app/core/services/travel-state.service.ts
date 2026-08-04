import { Injectable, inject, signal, computed } from '@angular/core';
import { ApiService } from './api.service';
import { ToastService } from './toast.service';
import { Travel } from '../models/travel.model';

@Injectable({
  providedIn: 'root',
})
export class TravelStateService {
  private api = inject(ApiService);
  private toast = inject(ToastService);

  private travelsSignal = signal<Travel[]>([]);
  isLoading = signal<boolean>(false);

  readonly allTravels = this.travelsSignal.asReadonly();

  readonly plannedTravels = computed(() => this.travelsSignal().filter((t) => !t.completed));
  readonly completedTravels = computed(() => this.travelsSignal().filter((t) => t.completed));

  loadTravels() {
    this.isLoading.set(true);
    this.api.getTravels().subscribe({
      next: (data) => {
        this.travelsSignal.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.toast.error('Failed to load travels');
        this.isLoading.set(false);
      },
    });
  }

  createTravel(data: Partial<Travel>) {
    this.api.createTravel(data).subscribe({
      next: (newTravel) => {
        this.travelsSignal.update((travels) => [newTravel, ...travels]);
        this.toast.success('Travel plan added!');
      },
      error: (err) => this.toast.error(err.error?.message || 'Failed to add travel'),
    });
  }

  updateTravel(id: number, data: Partial<Travel>) {
    this.travelsSignal.update((travels) =>
      travels.map((t) => (t.id === id ? { ...t, ...data } : t)),
    );

    this.api.updateTravel(id, data).subscribe({
      error: () => {
        this.loadTravels();
        this.toast.error('Failed to update travel');
      },
    });
  }

  deleteTravel(id: number) {
    this.api.deleteTravel(id).subscribe({
      next: () => {
        this.travelsSignal.update((travels) => travels.filter((t) => t.id !== id));
        this.toast.success('Travel plan deleted');
      },
      error: () => this.toast.error('Failed to delete travel'),
    });
  }
}
