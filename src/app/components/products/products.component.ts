import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interfaces/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductService:ProductService,
    private _CartService:CartService, 
    private _ToastrService:ToastrService, 
    private _Renderer2:Renderer2
  ) {}

  products:Product[] = [];
  pageSize:number = 0; //limit
  currentPage:number = 1;
  total:number = 0;

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
      }
    });
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

  pageChanged(event:any):void {
    this._ProductService.getProducts(event).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
      }
    });
  }

}
