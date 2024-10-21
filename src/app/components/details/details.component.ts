import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute:ActivatedRoute, 
    private _ProductService:ProductService, 
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _ToastrService:ToastrService
  ) {}

  productId!:string|null;
  productDtails:any = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id')
      }
    });

    this._ProductService.getProductDetails(this.productId).subscribe({
      next: ({data}) => {
        this.productDtails = data;
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

  productDetailsOptions: OwlOptions = {
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
    items:1,
    nav: false
  }

}
