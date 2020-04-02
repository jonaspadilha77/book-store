import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../admin/book.service';
import { Book } from '../../admin/book.model';
import { Subscription } from 'rxjs';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  public books: Book[] = [];
  private bookSubs: Subscription;

  constructor(
    private bookService: BookService,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this.bookSubs = this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  addToWishList(book: Book, quantity: number) {
    if (book.quantity >= quantity) {
      this.checkoutService.addItem(book);
    } else {
      alert('insufficient stock');
    }
  }

  ngOnDestroy() {
    this.bookSubs.unsubscribe();
  }

}
