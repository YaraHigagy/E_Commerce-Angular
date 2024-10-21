import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);
  baseUrl:string = `https://ecommerce.routemisr.com/api/v1/`;
  // myToken:any = { // It's replaced by an interceptor: myhttp
  //   token: localStorage.getItem('eToken')
  // }

  addToCart(prdId:any):Observable<any> {
    return this._HttpClient.post(this.baseUrl + `cart`, {
      productId: prdId
    }, 
    // {
    //   headers: this.myToken
    // }
    )
  }

  getCartUser():Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'cart', 
      // {
      //   headers: this.myToken
      // }
    )
  }

  removeCartItem(prdId:string):Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart/${prdId}`,
      // {
      //   headers: this.myToken
      // }
    )
  }

  updateCartCount(prdId:string, countnumber:number):Observable<any> {
    return this._HttpClient.put(this.baseUrl + `cart/${prdId}`,
      {
        count: countnumber
      },
      // {
      //   headers: this.myToken
      // }
    )
  }

  clearCart():Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `cart`,
      // {
      //   headers: this.myToken
      // }
    )
  }

  checkOut(cartId:string|null, orderInfo:object):Observable<any> {
    return this._HttpClient.post(this.baseUrl + `orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: orderInfo
      },
      // {
      //   headers: this.myToken
      // }
    )
  }

}
