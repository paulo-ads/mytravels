import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { ThemeToggleComponent } from '../../../shared/components/theme-toggle/theme-toggle.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ThemeToggleComponent],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-app-bg relative p-4">
      <div class="absolute inset-0 bg-world-map z-0"></div>
      <div
        class="relative z-10 w-full max-w-md bg-surface/75 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-border-base"
      >
        <div class="flex justify-between items-center mb-10">
          <div class="flex items-center gap-2 text-txt-main cursor-default select-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="w-6 h-6 bi bi-globe2"
              viewBox="0 0 16 16"
              stroke-width="1.5"
            >
              <path
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"
              />
            </svg>
            <span class="font-serif font-bold text-xl -ml-1 mb-1 tracking-tight">myTravels</span>
          </div>
          <app-theme-toggle></app-theme-toggle>
        </div>

        <h2 class="text-4xl font-serif font-bold mb-2 text-txt-main">Welcome aboard</h2>
        <p class="text-txt-muted text-sm mb-8">Sign up to start your journey.</p>

        <div class="flex bg-surface-hover p-1 rounded-full mb-8">
          <a
            routerLink="/signin"
            class="flex-1 py-2 rounded-full text-txt-muted hover:text-txt-main font-semibold text-sm text-center transition-all"
          >
            Sign In
          </a>
          <button
            class="flex-1 py-2 rounded-full bg-brand text-txt-inv font-semibold text-sm text-center transition-all"
          >
            Sign Up
          </button>
        </div>

        <form
          [formGroup]="signupForm"
          (ngSubmit)="onSubmit()"
          autocomplete="off"
          readonly
          onfocus="this.removeAttribute('readonly')"
          class="space-y-5"
        >
          <div>
            <label
              for="username"
              class="block text-xs font-bold text-txt-muted uppercase tracking-wider mb-2"
              >Username</label
            >
            <input
              id="username"
              type="username"
              formControlName="username"
              class="w-full rounded-2xl border border-border-base bg-surface-hover text-txt-main p-3.5 focus:ring-2 focus:ring-brand focus:border-brand focus:outline-none transition-shadow placeholder-txt-muted/50"
              placeholder="Traveler"
            />
          </div>

          <div>
            <label
              for="email"
              class="block text-xs font-bold text-txt-muted uppercase tracking-wider mb-2"
              >Email</label
            >
            <input
              autocomplete="off"
              class="w-full rounded-2xl border border-border-base bg-surface-hover text-txt-main p-3.5 focus:ring-2 focus:ring-brand focus:border-brand focus:outline-none transition-shadow placeholder-txt-muted/50"
              formControlName="email"
              id="email"
              onfocus="this.removeAttribute('readonly')"
              placeholder="you@example.com"
              readonly
              type="email"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-xs font-bold text-txt-muted uppercase tracking-wider mb-2"
              >Password</label
            >
            <div class="relative">
              <input
                [type]="showPassword ? 'text' : 'password'"
                autocomplete="off"
                class="w-full rounded-2xl border border-border-base bg-surface-hover text-txt-main p-3.5 focus:ring-2 focus:ring-brand focus:border-brand focus:outline-none transition-shadow placeholder-txt-muted/50"
                formControlName="password"
                id="password"
                onfocus="this.removeAttribute('readonly')"
                placeholder="••••••••"
                readonly
              />
              <button
                (click)="showPassword = !showPassword"
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-main cursor-pointer"
              >
                @if (!showPassword) {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path
                      d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
                    />
                  </svg>
                } @else {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"
                    />
                    <path
                      d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"
                    />
                  </svg>
                }
              </button>
            </div>
            <div class="flex justify-end mt-2"></div>
          </div>

          <div>
            <label
              for="confirmPassword"
              class="block text-xs font-bold text-txt-muted uppercase tracking-wider mb-2"
              >Confirm your password</label
            >
            <div class="relative">
              <input
                [type]="showConfirmPassword ? 'text' : 'password'"
                autocomplete="off"
                class="w-full rounded-2xl border border-border-base bg-surface-hover text-txt-main p-3.5 focus:ring-2 focus:ring-brand focus:border-brand focus:outline-none transition-shadow placeholder-txt-muted/50"
                formControlName="confirmPassword"
                id="confirmPassword"
                onfocus="this.removeAttribute('readonly')"
                placeholder="••••••••"
                readonly
              />
              <button
                (click)="showConfirmPassword = !showConfirmPassword"
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-txt-muted hover:text-txt-main cursor-pointer"
              >
                @if (!showConfirmPassword) {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path
                      d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
                    />
                  </svg>
                } @else {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-eye-slash-fill position: relative"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"
                    />
                    <path
                      d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"
                    />
                  </svg>
                }
              </button>
              @if (signupForm.get('confirmPassword')?.touched) {
                @if (signupForm.get('confirmPassword')?.hasError('required')) {
                  <p class="absolute text-danger text-xs mt-1.5 font-bold pl-1">
                    Please confirm your password.
                  </p>
                } @else if (signupForm.hasError('passwordMismatch')) {
                  <p class="absolute text-danger text-xs mt-1.5 font-bold pl-1">
                    The passwords don't match.
                  </p>
                }
              }
            </div>
            <div class="flex justify-end mt-2"></div>
          </div>

          <button
            type="submit"
            [disabled]="signupForm.invalid || isLoading"
            class="w-full bg-brand text-btn-text font-bold py-3.5 px-4 rounded-full enabled:hover:bg-secondary-hover transition-colors shadow-md disabled:opacity-50 enabled:cursor-pointer disabled:cursor-not-allowed mt-4 flex justify-center items-center gap-2"
          >
            {{ isLoading ? 'Signing Up...' : 'Create an account' }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          <div class="text-center mt-6 text-sm">
            <span class="text-txt-muted">Already have an account? </span>
            <a
              routerLink="/signin"
              class="text-txt-main hover:text-brand transition-colors font-bold"
              >Sign In</a
            >
          </div>
        </form>
      </div>
    </div>
  `,
})
export class SignupComponent {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toast = inject(ToastService);

  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  signupForm = this.fb.nonNullable.group(
    {
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: [
        '',
        [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9_]*$/)],
      ],
    },
    { validators: this.passwordsMismatch },
  );

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.api.signup(this.signupForm.getRawValue()).subscribe({
        next: () => {
          this.toast.success('Account created! Please log in.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.toast.error(err.error.message || 'Signup failed');
        },
      });
    }
  }

  passwordsMismatch(form: AbstractControl): { passwordMismatch: boolean } | null {
    const result =
      form.get('password')?.value === form.get('confirmPassword')?.value
        ? null
        : { passwordMismatch: true };
    return result;
  }
}
