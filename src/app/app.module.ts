import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { UserComponent } from './pages/user/user.component';
import { AdminRegisterComponent } from './pages/admin/admin-register/admin-register.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { StoreComponent } from './pages/user/store/store.component';
import { CheckoutComponent } from './pages/user/checkout/checkout.component';

import {HttpClientModule} from '@angular/common/http';
import { BookComponent } from './book/book.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AdminComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminRegisterComponent,
    UserComponent,
    StoreComponent,
    CheckoutComponent,
    BookComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
