import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
import { AdminProductComponent } from './components/admin/admin-product/admin-product.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { CartComponent } from './components/product/cart/cart.component';
import { ProductComponent } from './components/product/product/product.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { OrderComponent } from './components/order/order.component';
import { AdminOrderComponent } from './components/admin/admin-order/admin-order.component';
import { AuthGuard } from './guard/auth.service';
import { LoginComponent } from './components/login/login/login.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'users', component: AdminUserComponent },
            { path: 'products', component: AdminProductComponent },
            { path: 'orders', component: AdminOrderComponent },
        ],
    },
    {
        path: 'products',
        component: ProductComponent,
        children: [
            { path: 'list', component: ProductListComponent },
            { path: 'details/:id', component: ProductDetailsComponent },
            { path: 'cart', component: CartComponent, canActivate: [AuthGuard], },
        ]
    },
    {
        path: 'orders',
        component: OrderComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
