import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Book } from './book.model';
import { Observable, throwError, BehaviorSubject, Subject, of, forkJoin } from 'rxjs';
import { catchError, map, tap, finalize, mergeMap } from 'rxjs/operators';
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
        this.fetchBooks().subscribe();
    }


    getBooks() {
        return this.booksListBS.asObservable();
    }

    private fetchBooks = (): Observable<Book[]> => {
        return this.http.get<Book[]>(this.bookUrl)
            .pipe(
                map((books: Book[]) => books),
                tap({
                    next: (books) => this.booksListBS.next(books)
                }),
                catchError(this.handleError)
            );
    }

    public getBook = (id: number): Observable<Book> => {
        return this.http.get<Book>(`${this.bookUrl}/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    public deleteBook = (id: number): Observable<any> => {
        return this.http.delete(`${this.bookUrl}/${id}`)
            .pipe(
                finalize(() => this.loadData()),
                catchError(this.handleError)
            );
    }

    public updateBook = (book: Book): Observable<any> => {
        return this.http.put(`${this.bookUrl}/${book.id}`, book, this.httpOptions)
            .pipe(
                tap({
                    next: () => {
                        this.loadData();
                    }
                }),
                catchError(this.handleError)
            );
    }

    public addBook = (book: Book): Observable<any> => {
        return this.http.post(`${this.bookUrl}`, book, this.httpOptions)
            .pipe(
                finalize(() => this.loadData()),
                catchError(this.handleError)
            );
    }

    private handleError = (error: HttpErrorResponse) => {
        return throwError(error);
    }

    public orderFinalize = (books: Book[]): Observable<any> => {
        return forkJoin(books.map(book => {
            if (book.quantity === 1) {
                return this.deleteBook(book.id);
            } else {
                return this.updateBook(book);
            }
        }));
    }
}
