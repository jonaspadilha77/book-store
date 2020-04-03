import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../../admin/book.service';
import { Book } from '../../admin/book.model';
import { Subscription } from 'rxjs';
import { CheckoutService } from '../checkout/checkout.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getFormValidationErrors } from 'src/app/shared/get-form-validation-errors';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  public books: Book[] = [];
  private bookSubs: Subscription;
  public storeForm: FormGroup;
  public submitted = false;
  public storeFormErrors = [];
  public currentAddId = null;

  constructor(
    private bookService: BookService,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this.bookSubs = this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });


    this.storeForm = new FormGroup({
      quantity: new FormControl('', [
        Validators.required
      ])
    });
  }

  testValidationForm = (id: number) => {
    this.storeFormErrors = getFormValidationErrors(this.storeForm);
    this.currentAddId = id;
  }

  addToWishList(book: Book, quantity: number) {
    this.testValidationForm(book.id);
    this.submitted = true;


    if (this.storeFormErrors.length > 0) {
      return;
    }

    if (book.quantity >= quantity) {
      const updateBook = book;
      updateBook.quantity = updateBook.quantity - quantity;
      this.checkoutService.addItem(book);
    } else {
      alert('insufficient stock');
    }

    this.storeForm.reset();
  }

  ngOnDestroy() {
    this.bookSubs.unsubscribe();
  }

}
