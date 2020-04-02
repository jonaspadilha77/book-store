import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Book } from './book.model';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient) {

        this.loadData();
    }

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    private booksListBS = new BehaviorSubject<Book[]>([]);

    private bookUrl = 'http://localhost:3000/stock';

    private loadData(): void {
        this._fetchBooks().subscribe(res => {
            const books = res.map(item => new Book(
                item.id,
                item.name,
                item.author,
                item.genre,
                item.language,
                item.quantity
            ));
            this.booksListBS.next(books);
        });
    }


    getBooks() {
        return this.booksListBS.asObservable();
    }

    private _fetchBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(this.bookUrl)
            .pipe(
                catchError(this.handleError)
            );
    }

    public getBook(id: number) {
        return this.http.get<Book>(`${this.bookUrl}/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }


    private handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

}
