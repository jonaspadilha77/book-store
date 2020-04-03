import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../../admin/book.model';
import { CheckoutService } from './checkout.service';
import { Subscription } from 'rxjs';
import { BookService } from '../../admin/book.service';
import { tap, finalize, mergeMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  public books: Book[];
  private checkoutSubs: Subscription;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkoutSubs = this.checkoutService.getItems()
      .subscribe(books => {
        this.books = books;
      });
  }

  ngOnDestroy() {
    this.checkoutSubs.unsubscribe();
  }

  finalize = () => {
    this.checkoutService.updateOrderList(this.books)
      .subscribe(
        {
          next: () => this.router.navigate(['../store'], { relativeTo: this.route }),
          error: (err) => console.log(err)
        });
  }
}

