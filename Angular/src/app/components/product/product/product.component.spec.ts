import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should contain two navigation links', () => {
      const navLinks = fixture.nativeElement.querySelectorAll('nav a');
      expect(navLinks.length).toBe(2);
    });

    it('should have "Products" as the first navigation link text', () => {
      const navLinks = fixture.nativeElement.querySelectorAll('nav a');
      expect(navLinks[0].textContent).toContain('Products');
    });

    it('should have "View Cart" as the second navigation link text', () => {
      const navLinks = fixture.nativeElement.querySelectorAll('nav a');
      expect(navLinks[1].textContent).toContain('View Cart');
    });

    it('should have a router-outlet element', () => {
      const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
      expect(routerOutlet).toBeTruthy();
    });
  });
});
