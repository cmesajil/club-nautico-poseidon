import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private pendingRequests = 0;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  show(): void {
    this.pendingRequests++;

    this.loadingSubject.next(true);
  }

  hide(): void {
    if (this.pendingRequests > 0) {
      this.pendingRequests--;
    }

    if (this.pendingRequests === 0) {
      this.loadingSubject.next(false);
    }
  }
}
