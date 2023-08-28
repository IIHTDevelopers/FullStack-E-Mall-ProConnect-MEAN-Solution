import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should contain three navigation links', () => {
      const navLinks = fixture.nativeElement.querySelectorAll('.admin-sidebar a');
      expect(navLinks.length).toBe(3);
    });

    it('should have "Users" as the first navigation link text', () => {
      const navLinks = fixture.nativeElement.querySelectorAll('.admin-sidebar a');
      expect(navLinks[0].textContent).toContain('Users');
    });

    it('should have "Products" as the second navigation link text', () => {
      const navLinks = fixture.nativeElement.querySelectorAll('.admin-sidebar a');
      expect(navLinks[1].textContent).toContain('Products');
    });

    it('should have "Orders" as the third navigation link text', () => {
      const navLinks = fixture.nativeElement.querySelectorAll('.admin-sidebar a');
      expect(navLinks[2].textContent).toContain('Orders');
    });

    it('should have a router-outlet element', () => {
      const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
      expect(routerOutlet).toBeTruthy();
    });
  });
});
