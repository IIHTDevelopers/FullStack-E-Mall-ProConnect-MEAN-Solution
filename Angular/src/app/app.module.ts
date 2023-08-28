import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { AdminProductComponent } from './components/admin/admin-product/admin-product.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product/product.component';
import { CartComponent } from './components/product/cart/cart.component';
import { BlogComponent } from './components/product/blog/blog.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { OrderComponent } from './components/order/order.component';
import { AdminOrderComponent } from './components/admin/admin-order/admin-order.component';
import { LoginComponent } from './components/login/login/login.component';
import { TokenInterceptor } from './services/token.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    AdminComponent,
    AdminUserComponent,
    AdminProductComponent,
    ProductListComponent,
    ProductComponent,
    CartComponent,
    BlogComponent,
    ProductDetailsComponent,
    AdminOrderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],

})
export class AppModule { }
