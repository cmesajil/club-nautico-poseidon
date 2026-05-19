import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../../features/auth/auth.service';

describe('authGuard', () => {
  function setup(isAuthenticated: boolean) {
    const mockAuth = {
      isAuthenticated: () => isAuthenticated,
    };

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: mockAuth },
      ],
    });
  }

  it('should redirect to /login when not authenticated', () => {
    setup(false);

    const router = TestBed.inject(Router);
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result.toString()).toBe(router.parseUrl('/login').toString());
  });

  it('should return true when authenticated', () => {
    setup(true);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result).toBe(true);
  });
});
