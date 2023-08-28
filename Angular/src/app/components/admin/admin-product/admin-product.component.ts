import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    ratings: [],
    category: '',
    image: ''
  };
  searchName: string = '';
  selectedProduct: Product | null = null;
  isEditing: boolean = false;
  newProductForm!: FormGroup;
  topRatedProducts: Product[] = [];

  constructor(private productService: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadTopRatedProducts();
    this.initForm();
  }

  initForm(): void {
    this.newProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      ratings: [[]],
      category: [''],
      image: ['']
    });
  }

  loadTopRatedProducts(): void {
    this.productService.getTopRatedProducts(10).subscribe(
      (topRatedProducts: Product[]) => {
        this.topRatedProducts = topRatedProducts;
      },
      (error: any) => {
        console.error('Error fetching top-rated products:', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  createProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(
      (createdProduct: Product) => {
        console.log('Product created:', createdProduct);
        this.loadProducts();
        this.clearForm();
      },
      (error: any) => {
        console.error('Error creating product:', error);
      }
    );
  }

  updateProduct(): void {
    if (!this.selectedProduct) {
      return;
    }

    this.productService.updateProduct(this.selectedProduct._id!, this.newProduct).subscribe(
      (updatedProduct: Product) => {
        console.log('Product updated:', updatedProduct);
        this.loadProducts();
        this.clearForm();
      },
      (error: any) => {
        console.error('Error updating product:', error);
      }
    );
  }

  editProduct(product: Product): void {
    this.isEditing = true;
    this.selectedProduct = product;
    this.newProduct = { ...product };
  }

  deleteProduct(product: Product): void {
    if (!product._id) {
      return;
    }

    this.productService.deleteProduct(product._id).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.loadProducts();
        this.clearForm();
      },
      (error: any) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  searchProduct(): void {
    if (this.searchName.trim() === '') {
      this.loadProducts();
      return;
    }

    this.productService.searchProduct(this.searchName, '').subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('Error searching product:', error);
      }
    );
  }

  clearForm(): void {
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      ratings: [],
      category: '',
      image: ''
    };
    this.selectedProduct = null;
    this.isEditing = false;
  }
}
