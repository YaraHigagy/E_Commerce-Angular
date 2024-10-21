import { Component, ElementRef, HostListener, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
  constructor(private _Router:Router, private _CartService:CartService, private _Renderer2:Renderer2) {}

  @ViewChild('navBar') navElem!:ElementRef;

  @HostListener('window:scroll')
  onScroll():void {
    if(scrollY > 300) {
      this._Renderer2.addClass(this.navElem.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navElem.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navElem.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.navElem.nativeElement, 'shadow');
    }
  }

  cartNum:number = 0;

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNum = data;
      }
    });

    this._CartService.getCartUser().subscribe({
      next: (res) => {
        this.cartNum = res.numOfCartItems;
      }
    })
  }

  signOut():void {
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login']);
  }

}
