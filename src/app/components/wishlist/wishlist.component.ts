import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Product } from 'src/app/core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService:WishlistService, private _ToastrService:ToastrService, private _Renderer2:Renderer2, private _CartService:CartService) {}

  products:Product[] = [];
  wishlistData:string[] = [];

  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.products = res.data;
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

        // this._WishlistService.getWishlist().subscribe({ // This should be done with filter and filter is the correct method for it
        //   next: (res) => {
        //     this.products = res.data;
        //   }
        // })

        // Filter is faster, easier, and more professional
        const newProductData = this.products.filter((item:any) => this.wishlistData.includes(item._id));
        this.products = newProductData;
      }
    })
  }

}
