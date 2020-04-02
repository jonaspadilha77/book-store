import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../pages/user/store/checkout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private checkoutService: CheckoutService) { }
  private checkoutSubs: Subscription;

  public count = 0;

  ngOnInit() {
  this.checkoutSubs = this.checkoutService.getItems().subscribe( books => this.count = books.length);
  }

}
