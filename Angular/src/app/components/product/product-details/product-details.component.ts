import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: string;
  product: Product | null = null;
  blog: Blog | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.loadProductDetails();
      this.loadBlogDetails(this.productId);
    });
  }

  loadProductDetails(): void {
    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe(
        (product: Product) => {
          this.product = product;
        },
        (error: any) => {
          this.product = null;
        }
      );
    }
  }

  loadBlogDetails(productId: string): void {
    this.blogService.getBlogByProduct(productId).subscribe(
      (blog: Blog) => {
        this.blog = blog;
      },
      (error: any) => {
        this.blog = null;
      }
    );
  }

  addToCart(product: Product): void {
    const userId = '64d3038b7bd058cd651357ef';
    this.productService.addToCart(userId, product._id ?? '0', 1, product.price).subscribe(
      () => { },
      (error: any) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
}
