import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { BookComponent } from './book/book.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';
import { UserComponent } from './pages/user/user.component';
import { StoreComponent } from './pages/user/store/store.component';
import { CheckoutGuard } from './pages/user/checkout/checkoutGuard.service';
import { CheckoutComponent } from './pages/user/checkout/checkout.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'products', component: AdminProductsComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'products/new', component: AdminRegisterComponent },
      { path: 'products/:id/edit', component: AdminRegisterComponent },

    ]
  },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'store', component: StoreComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate: [CheckoutGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
