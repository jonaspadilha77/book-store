import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { BookComponent } from './book/book.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'products', component: AdminProductsComponent },
      { path: 'products/new', component: AdminRegisterComponent },
      { path: 'products/:id/edit', component: AdminRegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
