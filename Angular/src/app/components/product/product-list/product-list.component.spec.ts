import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;

  const mockProducts: Product[] = [
    {
      _id: '1',
      name: 'Product 1',
      price: 10,
      description: 'Description 1',
      ratings: [4, 5],
    },
    {
      _id: '2',
      name: 'Product 2',
      price: 20,
      description: 'Description 2',
      ratings: [3, 4],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers: [ProductService], // Provide the service here
    }).compileComponents();

    productService = TestBed.inject(ProductService); // Inject the service
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should load products on initialization', () => {
      const productServiceSpy = jest.spyOn(productService, 'getAllProducts').mockReturnValue(of(mockProducts));
      fixture.detectChanges();
      expect(productServiceSpy).toHaveBeenCalled();
      expect(component.products).toEqual(mockProducts);
    });

    it('should search for products when searchProduct is called', () => {
      const productServiceSpy = jest.spyOn(productService, 'searchProduct').mockReturnValue(of(mockProducts));
      component.searchName = 'Product 1';
      component.searchProduct();

      expect(productServiceSpy).toHaveBeenCalledWith('Product 1', '');
      expect(component.products).toEqual(mockProducts);
    });

    it('should load all products when searchName is empty', () => {
      const loadProductsSpy = jest.spyOn(component, 'loadProducts');
      component.searchName = '';
      component.searchProduct();

      expect(loadProductsSpy).toHaveBeenCalled();
    });

    it('should add product to cart', () => {
      const addToCartSpy = jest
        .spyOn(productService, 'addToCart')
        .mockReturnValue(of({}));
      const mockProduct: Product = {
        _id: '1',
        name: 'Product 1',
        price: 10,
        description: 'Description 1',
        ratings: [4, 5],
      };
      component.addToCart(mockProduct);

      expect(addToCartSpy).toHaveBeenCalledWith(
        '64d3038b7bd058cd651357ef',
        '1',
        1,
        10
      );
    });

    // it('should navigate to product details', () => {
    //   const routerSpy = spyOn(component.router, 'navigate');
    //   const mockProduct: Product = {
    //     _id: '1',
    //     name: 'Product 1',
    //     price: 10,
    //     description: 'Description 1',
    //     ratings: [4, 5],
    //   };
    //   component.viewDetails(mockProduct);
    //   expect(routerSpy).toHaveBeenCalledWith(['/products/details', '1']);
    // });

    // it('should reset search when searchName is empty', () => {
    //   component.searchName = 'Product';
    //   component.resetSearch();
    //   expect(component.searchName).toBe('');
    // });
  });
});
