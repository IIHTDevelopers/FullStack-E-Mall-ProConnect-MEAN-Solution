import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;
    let compiled: HTMLElement;
    let router: Router;

    describe('boundary', () => {
        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([
                    { path: 'user', component: DummyComponent },
                    { path: 'admin', component: DummyComponent },
                ]), HttpClientModule],
                declarations: [AppComponent],
                providers: [AuthService]
            }).compileComponents();

            fixture = TestBed.createComponent(AppComponent);
            app = fixture.componentInstance;
            compiled = fixture.nativeElement;
            router = TestBed.inject(Router);
            fixture.detectChanges();
        });

        it('should create the app', () => {
            expect(app).toBeTruthy();
        });

        it(`should have as title 'E-Mall ProConnect'`, () => {
            expect(app.title).toEqual('E-Mall ProConnect');
        });

        it('should render title', () => {
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('h1').textContent).toContain('E-Mall ProConnect');
        });

        it('should initialize isLoggedIn to false', () => {
            expect(app.isLoggedIn).toBe(false);
        });

        it('should update isLoggedIn when logged out', () => {
            app.onLogout();
            expect(app.isLoggedIn).toBe(false);
        });

        it('should display "Login" button when not logged in', () => {
            expect(compiled.querySelector('.login-button')!.textContent).toContain('Login');
        });

        it('should display "Logout" button when logged in', () => {
            const app = fixture.componentInstance;
            app.isLoggedIn = true;
            fixture.detectChanges();
            expect(compiled.querySelector('.login-button')!.textContent).toContain('Logout');
        });

        it('should display navigation links', () => {
            expect(compiled.querySelector('a[href="/"]')).toBeTruthy();
            expect(compiled.querySelector('a[href="/products"]')).toBeTruthy();
        });

        // it('should navigate to /products when clicking on the "Product" link', () => {
        //     const userLink = fixture.debugElement.query(By.css('a[routerLink="/products"]'));
        //     console.log(userLink);
        //     userLink.nativeElement.click();
        //     fixture.detectChanges();
        //     expect(router.url).toBe('/products');
        // });
    });
});

@Component({ template: '' })
class DummyComponent { }