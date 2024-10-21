import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService, private _Renderer2:Renderer2) {}

  cartDetails:any = null; //initial value = null not {} to ensure the *ngIf is working properly

  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      }
    })
  }

  removeItem(id:string, element:HTMLButtonElement):void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._CartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      }
    })
  }

  changeCount(id:string, count:number, btn1:HTMLButtonElement, btn2:HTMLButtonElement):void {
    if(count >= 1) {
      this._Renderer2.setAttribute(btn1, 'disabled', 'true');
      this._Renderer2.setAttribute(btn2, 'disabled', 'true');

      this._CartService.updateCartCount(id, count).subscribe({
        next: (res) => {
          this.cartDetails = res.data;
          this._Renderer2.removeAttribute(btn1, 'disabled');
          this._Renderer2.removeAttribute(btn2, 'disabled');
        },
        error: (err) => {
          this._Renderer2.removeAttribute(btn1, 'disabled');
          this._Renderer2.removeAttribute(btn2, 'disabled');
        }
      })
    }
  }

  clear():void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        if(res.message == 'success') {
          this.cartDetails = null;
          this._CartService.cartNumber.next(0);
        }
      }
    })
  }

}
