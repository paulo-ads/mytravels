import { Dialog } from '@angular/cdk/dialog';
import { Injectable, inject } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { ProfileFormModalComponent } from '../../shared/components/profile-form-modal/profile-form-modal';
import { Travel } from '../models/travel.model';
import { TravelFormModalComponent } from '../../features/travels/components/travel-form-modal/travel-form-modal';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dialog = inject(Dialog);

  openProfileForm(user: User): Observable<{ username: string }> {
    const dialogRef = this.dialog.open<{ username: string }>(ProfileFormModalComponent, {
      width: '450px',
      data: { user },
    });

    return dialogRef.closed.pipe(filter((result): result is { username: string } => !!result));
  }

  openTravelForm(travel?: Travel): Observable<Partial<Travel>> {
    const dialogRef = this.dialog.open<Partial<Travel>>(TravelFormModalComponent, {
      width: '500px',
      data: { travel },
    });

    return dialogRef.closed.pipe(filter((result): result is Partial<Travel> => !!result));
  }
}
