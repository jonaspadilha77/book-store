import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../../admin/book.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private itemsSubs = new BehaviorSubject<Book[]>([]);
  private items: Book[] = [];

  constructor() { }

  public getItems = () => {
    return this.itemsSubs.asObservable();
  }

  public addItem = (book: Book) => {
    this.items.push(book);
    this.itemsSubs.next(this.items);
  }


  public removeItem = (index: number) => {
    delete this.items[index];
    this.items.filter(i => i);
    this.itemsSubs.next(this.items);
  }

}
