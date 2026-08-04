import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { countries as countryList } from '../../../../core/constants/countries';
import { Travel } from '../../../../core/models/travel.model';

@Component({
  selector: 'app-travel-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div
      class="fixed inset-0 bg-black/60 z-[100]"
      (click)="close()"
      tabindex="0"
      (keydown.enter)="close()"
    ></div>
    <div class="fixed inset-0 flex items-center justify-center p-4 z-[101]">
      <div
        class="relative w-full max-w-lg bg-surface border border-border-base rounded-lg shadow-xl p-6"
      >
        <h2 class="text-2xl font-bold mb-6 text-txt-main">
          {{ isEditMode ? 'Edit Travel Plan' : 'New Travel Plan' }}
        </h2>

        <form [formGroup]="form" (ngSubmit)="save()">
          <div class="space-y-4">
            <div>
              <label for="countryCode" class="block text-sm font-medium text-txt-main mb-1"
                >Destination</label
              >
              <select
                id="countryCode"
                formControlName="countryCode"
                class="w-full border border-border-base bg-app-bg text-txt-main rounded-md p-2 focus:ring-2 focus:ring-brand focus:outline-none"
              >
                <option value="" disabled selected>Select a country...</option>
                @for (country of countries; track country.code) {
                  <option [value]="country.code">{{ country.name }}</option>
                }
              </select>
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <label for="startDate" class="block text-sm font-medium text-txt-main mb-1"
                  >Start Date</label
                >
                <input
                  id="startDate"
                  type="date"
                  formControlName="startDate"
                  class="w-full border border-border-base bg-transparent text-txt-main rounded-md p-2 focus:ring-2 focus:ring-brand focus:outline-none"
                />
              </div>
              <div class="flex-1">
                <label for="endDate" class="block text-sm font-medium text-txt-main mb-1"
                  >End Date</label
                >
                <input
                  id="endDate"
                  type="date"
                  formControlName="endDate"
                  class="w-full border border-border-base bg-transparent text-txt-main rounded-md p-2 focus:ring-2 focus:ring-brand focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label for="notes" class="block text-sm font-medium text-txt-main mb-1"
                >Notes / Itinerary</label
              >
              <textarea
                id="notes"
                formControlName="notes"
                rows="3"
                placeholder="Places to visit, flight numbers, etc."
                class="w-full border border-border-base bg-transparent text-txt-main rounded-md p-2 resize-none focus:ring-2 focus:ring-brand focus:outline-none"
              ></textarea>
            </div>

            <div class="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="completed"
                formControlName="completed"
                class="w-4 h-4 text-brand rounded border-border-base bg-transparent focus:ring-brand cursor-pointer"
              />
              <label
                for="completed"
                class="text-sm font-medium text-txt-main cursor-pointer select-none"
              >
                I have already visited this destination
              </label>
            </div>
          </div>

          <div class="mt-8 flex justify-end gap-3">
            <button
              type="button"
              (click)="close()"
              class="text-txt-inv font-bold px-4 py-2 rounded-[2em] bg-danger hover:bg-danger/50 hover:text-txt-muted transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="form.invalid"
              class="bg-brand text-txt-inv font-bold px-4 py-2 rounded-[2em] enabled:hover:bg-brand/50 enabled:hover:text-txt-muted transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class TravelFormModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  public dialogRef = inject(DialogRef<Partial<Travel>>);
  public data: { travel?: Travel } = inject(DIALOG_DATA) || {};

  isEditMode = !!this.data.travel;

  countries = countryList;

  form = this.fb.nonNullable.group({
    countryCode: ['', Validators.required],
    startDate: [''],
    endDate: [''],
    notes: [''],
    completed: [false],
  });

  ngOnInit() {
    if (this.isEditMode && this.data.travel) {
      const travel = this.data.travel;

      this.form.patchValue({
        countryCode: travel.countryCode,
        completed: travel.completed,
        notes: travel.notes || '',
        startDate: travel.startDate ? new Date(travel.startDate).toISOString().split('T')[0] : '',
        endDate: travel.endDate ? new Date(travel.endDate).toISOString().split('T')[0] : '',
      });
    }
  }

  save() {
    if (this.form.valid) {
      const rawData = this.form.getRawValue();
      const countryName =
        this.countries.find((c) => c.code === rawData.countryCode)?.name || 'Unknown';

      this.dialogRef.close({
        ...rawData,
        countryName,
        startDate: rawData.startDate || null,
        endDate: rawData.endDate || null,
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
