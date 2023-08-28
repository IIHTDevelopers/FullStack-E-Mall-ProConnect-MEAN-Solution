import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchName: string = '';

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
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

  addToCart(product: Product): void {
    this.productService.addToCart('64d3038b7bd058cd651357ef', product._id ?? '0', 1, product.price).subscribe(
      () => { },
      (error: any) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

  viewDetails(product: Product): void {
    this.router.navigate(['/products/details', product._id ?? '0']);
  }

}
