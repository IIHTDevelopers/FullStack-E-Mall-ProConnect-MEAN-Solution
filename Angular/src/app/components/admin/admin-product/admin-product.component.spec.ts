import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminProductComponent } from './admin-product.component';
import { ProductService } from '../../../services/product.service';
import { of } from 'rxjs';
import { Product } from '../../product/cart/cart.component';

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;
  let productService: ProductService;

  const productServiceMock = {
    getAllProducts: jest.fn().mockReturnValue(of([])),
    searchProduct: jest.fn().mockReturnValue(of([])),
    createProduct: jest.fn().mockReturnValue(of({})),
    updateProduct: jest.fn().mockReturnValue(of({})),
    deleteProduct: jest.fn().mockReturnValue(of({})),
    getTopRatedProducts: jest.fn().mockReturnValue(of([])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProductComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load products on init', () => {
      const productsMock = [
        { _id: 'product1', name: 'Product 1', description: 'Description 1', price: 10, ratings: [], category: '', image: '' },
        { _id: 'product2', name: 'Product 2', description: 'Description 2', price: 20, ratings: [], category: '', image: '' },
      ];
      productServiceMock.getAllProducts.mockReturnValue(of(productsMock));
      component.ngOnInit();
      expect(productServiceMock.getAllProducts).toHaveBeenCalled();
      expect(component.products).toEqual(productsMock);
    });

    it('should search products by name', () => {
      const searchName = 'Product';
      const searchedProductsMock = [
        { _id: 'product1', name: 'Product 1', description: 'Description 1', price: 10, ratings: [], category: '', image: '' },
      ];
      productServiceMock.searchProduct.mockReturnValue(of(searchedProductsMock));
      component.searchName = searchName;
      component.searchProduct();
      expect(productServiceMock.searchProduct).toHaveBeenCalledWith(searchName, '');
      expect(component.products).toEqual(searchedProductsMock);
    });

    it('should clear the form', () => {
      component.newProduct = {
        name: 'Test Product',
        description: 'Test Description',
        price: 15,
        ratings: [],
        category: 'Test Category',
        image: 'test.jpg'
      };
      component.selectedProduct = component.newProduct;
      component.isEditing = true;
      component.clearForm();
      expect(component.newProduct).toEqual({
        name: '',
        description: '',
        price: 0,
        ratings: [],
        category: '',
        image: ''
      });
      expect(component.selectedProduct).toBeNull();
      expect(component.isEditing).toBeFalsy();
    });

    it('should load top rated products on init', () => {
      const topRatedProductsMock = [
        { _id: 'product1', name: 'Product 1', price: 10, category: '', ratings: ['4.5', '4.8'] },
        { _id: 'product2', name: 'Product 2', price: 20, category: '', ratings: ['4.0', '4.2'] },
      ];
      productServiceMock.getTopRatedProducts.mockReturnValue(of(topRatedProductsMock));
      component.ngOnInit();
      expect(productServiceMock.getTopRatedProducts).toHaveBeenCalledWith(10);
      expect(component.topRatedProducts).toEqual(topRatedProductsMock);
    });

    it('should delete a product', () => {
      const productToDelete: Product = {
        _id: '1', name: 'Product to Delete', description: 'Description to Delete', price: 30, ratings: [],
        __v: 0
      };
      productServiceMock.deleteProduct.mockReturnValue(of());
      component.products = [productToDelete];
      component.deleteProduct(productToDelete);
      expect(productServiceMock.deleteProduct).toHaveBeenCalledWith('1');
      // expect(component.products).toEqual([]);
    });

    it('should search for a product by name', () => {
      const searchedProductsMock: Product[] = [
        { _id: '1', name: 'Searched Product 1', description: 'Description 1', price: 10, ratings: [4, 5], __v: 0 },
        { _id: '2', name: 'Searched Product 2', description: 'Description 2', price: 20, ratings: [5], __v: 0 }
      ];
      productServiceMock.searchProduct.mockReturnValue(of(searchedProductsMock));
      component.searchName = 'Searched Product';
      component.searchProduct();
      expect(productServiceMock.searchProduct).toHaveBeenCalledWith('Searched Product', '');
      expect(component.products).toEqual(searchedProductsMock);
    });

    it('should clear the form and reset editing mode', () => {
      component.selectedProduct = { _id: '1', name: 'Selected Product', description: 'Selected Description', price: 25, ratings: [], category: 'Selected Category', image: 'selected-url' };
      component.isEditing = true;
      component.newProduct.name = 'New Product';
      component.newProduct.price = 30;
      component.clearForm();
      expect(component.selectedProduct).toBeNull();
      expect(component.isEditing).toBe(false);
      expect(component.newProduct.name).toBe('');
      expect(component.newProduct.price).toBe(0);
      expect(component.newProductForm.valid).toBe(false);
    });
  });
});
