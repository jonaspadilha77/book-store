import { Component, OnInit } from '@angular/core';
import { Book } from '../../admin/book.model';
import { CheckoutService } from './checkout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public books: Book[];
  private checkoutSubs: Subscription;

  constructor(
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this.checkoutSubs = this.checkoutService.getItems().subscribe(books => this.books = books);
  }

}
