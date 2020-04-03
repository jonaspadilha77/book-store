import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, forkJoin } from 'rxjs';
import { Book } from '../../admin/book.model';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, mergeMap } from 'rxjs/operators';
import { BookService } from '../../admin/book.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private itemsSubs = new BehaviorSubject<Book[]>([]);
  private items: Book[] = [];

  constructor(
    private http: HttpClient,
    private bookService: BookService
  ) {
    this.loadData();
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private checkoutkUrl = 'http://localhost:3000/checkout';


  public getItems = () => {
    return this.itemsSubs.asObservable();
  }

  private loadData(): void {
    this.fetchCheckout().subscribe(res => {
      const books = res.map(item => new Book(
        item.id,
        item.name,
        item.author,
        item.genre,
        item.language,
        item.quantity
      ));
      this.itemsSubs.next(books);
    });
  }

  private fetchCheckout = (): Observable<Book[]> => {
    return this.http.get<Book[]>(this.checkoutkUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  public addItem = (book: Book) => {
    this.items.push(book);
    this.itemsSubs.next(this.items);
  }



  public hasItens() {
    return this.items.length > 0;
  }

  public removeItem = (index: number) => {
    delete this.items[index];
    this.items = this.items.filter(i => i);
    this.itemsSubs.next(this.items);
  }

  public updateOrderList = (bookIds: number[]): Observable<any> => {
    return this.http.post(`${this.checkoutkUrl}`, this.items, this.httpOptions)
      .pipe(
        mergeMap(() => this.bookService.orderFinalize(bookIds)),
        catchError(this.handleError)
      );

  }

  private handleError = (error: HttpErrorResponse) => {
    return throwError(error);
  }



}
