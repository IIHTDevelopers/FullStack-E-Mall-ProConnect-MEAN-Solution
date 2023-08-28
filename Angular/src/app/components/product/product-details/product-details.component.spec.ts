import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ProductDetailsComponent } from './product-details.component';
import { ProductService } from '../../../services/product.service';
import { BlogService } from '../../../services/blog.service';

describe('ProductDetailsComponent', () => {
    let component: ProductDetailsComponent;
    let fixture: ComponentFixture<ProductDetailsComponent>;
    let productService: ProductService;
    let blogService: BlogService;
    let route: any;

    const productServiceMock = {
        getProduct: jest.fn().mockReturnValue(of()),
        addToCart: jest.fn().mockReturnValue(of())
    };

    const blogServiceMock = {
        getBlogByProduct: jest.fn().mockReturnValue(of())
    };

    beforeEach(async () => {
        route = {
            params: new BehaviorSubject({ id: 'product123' })
        };

        await TestBed.configureTestingModule({
            declarations: [ProductDetailsComponent],
            providers: [
                { provide: ActivatedRoute, useValue: route },
                { provide: ProductService, useValue: productServiceMock },
                { provide: BlogService, useValue: blogServiceMock }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailsComponent);
        component = fixture.componentInstance;
        productService = TestBed.inject(ProductService);
        blogService = TestBed.inject(BlogService);
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should load product and blog details on init', () => {
            const productMock = { _id: 'product123', name: 'Product Name' };
            const blogMock = { title: 'Blog Title', content: 'Blog Content' };
            productServiceMock.getProduct.mockReturnValue(of(productMock));
            blogServiceMock.getBlogByProduct.mockReturnValue(of(blogMock));
            component.ngOnInit();
            expect(productServiceMock.getProduct).toHaveBeenCalledWith('product123');
            expect(blogServiceMock.getBlogByProduct).toHaveBeenCalledWith('product123');
            expect(component.product).toEqual(productMock);
            expect(component.blog).toEqual(blogMock);
        });

        it('should add product to cart', () => {
            const productMock: any = { _id: 'product123', name: 'Product Name', price: 10 };
            productServiceMock.addToCart.mockReturnValue(of());
            component.addToCart(productMock);
            expect(productServiceMock.addToCart).toHaveBeenCalledWith('64d3038b7bd058cd651357ef', 'product123', 1, 10);
        });

        it('should handle error when loading product details', () => {
            const errorMock = new Error('Product not found');
            productServiceMock.getProduct.mockReturnValue(throwError(errorMock));
            component.ngOnInit();
            expect(productServiceMock.getProduct).toHaveBeenCalledWith('product123');
            expect(component.product).toBeNull();
        });

        it('should handle error when loading blog details', () => {
            const errorMock = new Error('Blog not found');
            blogServiceMock.getBlogByProduct.mockReturnValue(throwError(errorMock));
            component.ngOnInit();
            expect(blogServiceMock.getBlogByProduct).toHaveBeenCalledWith('product123');
            expect(component.blog).toBeNull();
        });
    });
});
