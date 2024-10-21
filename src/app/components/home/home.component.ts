import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { Category } from 'src/app/core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CuttextPipe, CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _ProductService:ProductService,
    private _CartService:CartService, 
    private _ToastrService:ToastrService, 
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService
  ) {}

  products:Product[] = [];
  categories:Category[] = [];
  wishlistData:string[] = [];
  term:string = '';

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      }
    });

    this._ProductService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      }
    })

    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        const newData = res.data.map((item:any) => item._id);
        this.wishlistData = newData;
      }
    })
  }

  addProduct(id:string|undefined, element:HTMLButtonElement):void {  //undefined because in the interface: _id? is optional
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._Renderer2.removeAttribute(element, 'disabled');

        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      }
    })
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout: 7000,
    autoplaySpeed:1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout: 5000,
    autoplaySpeed:1000,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  addFav(prdId:string|undefined) {
    this._WishlistService.addToWishlist(prdId).subscribe({
      next: (res) => {
        this.wishlistData = res.data;
        this._ToastrService.success(res.message);
      }
    })
  }

  removeFav(prdId:string|undefined) {
    this._WishlistService.removeWishlistItem(prdId).subscribe({
      next: (res) => {
        this.wishlistData = res.data;
        this._ToastrService.success(res.message);
      }
    })
  }

}
