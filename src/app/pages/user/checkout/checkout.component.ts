import { Component, OnInit } from '@angular/core';
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
export class CheckoutComponent implements OnInit {

  public books: Book[];
  private bookIds: number[];
  private checkoutSubs: Subscription;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkoutSubs = this.checkoutService.getItems()
      .pipe(
        tap(books => {
          this.bookIds = books.map(i => i.id);
        })
      )
      .subscribe(books => {
        this.books = books;
      });
  }

  finalize = () => {
    this.checkoutService.updateOrderList(this.bookIds)
      .subscribe(
        {
          next: () => this.router.navigate(['../store'], { relativeTo: this.route }),
          error: (err) => console.log(err)
        });
  }
}

