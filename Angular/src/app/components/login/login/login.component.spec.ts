import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  const authServiceMock = {
    login: jest.fn().mockReturnValue(of())
  };

  const routerMock = {
    navigate: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call authService.login and navigate on successful form submission', fakeAsync(() => {
      const email = 'test@example.com';
      const password = 'password123';
      component.loginForm.setValue({ email, password });
      component.onSubmit();
      tick();
      expect(authService.login).toHaveBeenCalledWith(email, password);
    }));

    it('should call authService.login and navigate on successful form submission', () => {
      const email = 'test@example.com';
      const password = 'password';
      component.loginForm.setValue({ email, password });
      component.onSubmit();
      expect(authService.login).toHaveBeenCalledWith(email, password);
    });
  });
});
