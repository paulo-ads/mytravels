import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile-form-modal',
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
        class="relative w-full max-w-md bg-surface border border-border-base rounded-[2rem] shadow-2xl p-8"
      >
        <h2 class="text-3xl font-serif font-bold mb-6 text-txt-main">Edit Profile</h2>

        <form [formGroup]="profileForm" (ngSubmit)="save()">
          <div class="space-y-5">
            <div>
              <label
                for="email"
                class="block text-xs font-bold text-txt-muted uppercase tracking-wider mb-2"
              >
                Email
              </label>
              <input
                id="email"
                formControlName="email"
                class="w-full rounded-2xl border border-border-base bg-app-bg text-txt-muted p-3.5 cursor-not-allowed opacity-70"
              />
              <p class="text-xs text-txt-muted mt-2 font-medium">Email cannot be changed.</p>
            </div>

            <div>
              <label
                for="username"
                class="block text-xs font-bold text-txt-muted uppercase tracking-wider mb-2"
              >
                Username
              </label>
              <input
                id="username"
                formControlName="username"
                class="w-full rounded-2xl border border-border-base bg-surface-hover text-txt-main p-3.5 focus:ring-2 focus:ring-brand focus:border-brand focus:outline-none transition-shadow"
              />
              @if (profileForm.get('username')?.touched && profileForm.get('username')?.invalid) {
                @if (profileForm.get('username')?.hasError('required')) {
                  <p class="text-danger text-xs mt-1.5 font-medium pl-1">Username is required.</p>
                } @else if (profileForm.get('username')?.hasError('maxlength')) {
                  <p class="text-danger text-xs mt-1.5 font-medium pl-1">Max 20 characters.</p>
                } @else if (profileForm.get('username')?.hasError('pattern')) {
                  <p class="text-danger text-xs mt-1.5 font-medium pl-1">
                    Only letters, numbers, and underscores.
                  </p>
                }
              }
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
              [disabled]="profileForm.invalid || profileForm.pristine"
              class="bg-brand text-txt-inv font-bold px-4 py-2 rounded-[2em] enabled:hover:bg-brand/50 enabled:hover:text-txt-muted transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ProfileFormModalComponent implements OnInit {
  private fb = inject(FormBuilder);
  public dialogRef = inject(DialogRef);
  public data: { user: User } = inject(DIALOG_DATA);

  profileForm = this.fb.nonNullable.group({
    email: [{ value: '', disabled: true }],
    username: [
      '',
      [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9_]*$/)],
    ],
  });

  ngOnInit() {
    if (this.data.user) {
      this.profileForm.patchValue({
        email: this.data.user.email,
        username: this.data.user.username,
      });
    }
  }

  save() {
    if (this.profileForm.valid) {
      this.dialogRef.close({ username: this.profileForm.getRawValue().username });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
