import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductService:ProductService) {}

  categoryId:string|null = '';
  // categoryDetails:Category = {
  //   name: '',
  //   image: ''
  // };
  categoryDetails:Category = {} as Category;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id')
      }
    })

    this._ProductService.getCategoryDetails(this.categoryId).subscribe({
      next: (res) => {
        this.categoryDetails = res.data;
      }
    })
  }

}
