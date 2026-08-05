import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse, LoginPayload, SignupPayload, User } from '../models/user.model';
import { GuidePayload } from '../models/guide.model';
import { Travel } from '../models/travel.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://mytravels.onrender.com/api';

  signup(data: SignupPayload): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/signup`, data);
  }

  login(data: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data);
  }

  updateUser(
    id: number,
    data: { username?: string; password?: string; currentPassword?: string },
  ): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, data);
  }

  getGuide(countryCode: string): Observable<GuidePayload> {
    return this.http.get<GuidePayload>(`${this.apiUrl}/guides/${countryCode}`);
  }

  createTravel(data: Partial<Travel>): Observable<Travel> {
    return this.http.post<Travel>(`${this.apiUrl}/travels`, data);
  }

  getTravels(): Observable<Travel[]> {
    return this.http.get<Travel[]>(`${this.apiUrl}/travels`);
  }
  updateTravel(id: number, data: Partial<Travel>): Observable<Travel> {
    return this.http.put<Travel>(`${this.apiUrl}/travels/${id}`, data);
  }

  deleteTravel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/travels/${id}`);
  }
}
