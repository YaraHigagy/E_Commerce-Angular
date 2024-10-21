import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {path:'', //blank
    canActivate:[authGuard],
    loadComponent:()=>import('./layouts/blank-layout/blank-layout.component')
    .then((m)=>m.BlankLayoutComponent),
    children: [
      {path:'', redirectTo:'home', pathMatch:'full'},
      {path:'home', loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent), title:'Home'},
      {path:'cart', loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent), title:'Cart'},
      {path:'wishlist', loadComponent:()=>import('./components/wishlist/wishlist.component').then((m)=>m.WishlistComponent), title:'Wishlist'},
      {path:'products', loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent), title:'Products'},
      {path:'productdetails/:id', loadComponent:()=>import('./components/details/details.component').then((m)=>m.DetailsComponent), title:'Product Details'},
      {path:'brands', loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent), title:'Brands'},
      {path:'categories', loadComponent:()=>import('./components/categories/categories.component').then((m)=>m.CategoriesComponent), title:'Categories'},
      {path:'categorydetails/:id', loadComponent:()=>import('./components/categorydetails/categorydetails.component').then((m)=>m.CategorydetailsComponent), title:'Category Details'},
      {path:'payment/:id', loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent), title:'Payment'},
      {path:'allorders', loadComponent:()=>import('./components/all-orders/all-orders.component').then((m)=>m.AllOrdersComponent), title:'AllOrders'},
      {path:'forgotpassword', loadComponent:()=>import('./components/forgotpassword/forgotpassword.component').then((m)=>m.ForgotpasswordComponent), title:'Forgotpassword'},
    ]
  },
  {path:'', //auth
    loadComponent:()=>import('./layouts/auth-layout/auth-layout.component')
    .then((m)=>m.AuthLayoutComponent), 
    children: [
      {path:'', redirectTo:'login', pathMatch:'full'},
      {path:'login', loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent), title:'Login'},
      {path:'register', loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent), title:'Register'},
      {path:'forgot', loadComponent:()=>import('./components/forgotpassword/forgotpassword.component').then((m)=>m.ForgotpasswordComponent), title:'Forgotpassword'},
    ]
  },
  {path:'**', //notfound
    loadComponent:()=>
      import('./components/notfound/notfound.component').then(
        (m)=>m.NotfoundComponent
      ),
    title:'Not Found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
