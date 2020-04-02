import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  constructor(private bookService: BookService) { }

  bookSubs: Subscription;
  ngOnInit() {
    this.bookSubs = this.bookService.getBooks().subscribe(data => {
      console.log(data)
    });
  }

}
