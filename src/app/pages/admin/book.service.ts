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
        this.fetchBooks().subscribe(res => {
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

    private fetchBooks = (): Observable<Book[]> => {
        return this.http.get<Book[]>(this.bookUrl)
            .pipe(
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

    public updateBook = (book: Book): void => {
        this.http.put(`${this.bookUrl}/${book.id}`, book, this.httpOptions)
            .pipe(
                tap({
                    next: () => {
                        this.loadData();
                    }
                }),
                catchError(this.handleError)
            ).subscribe();
    }

    public addBook = (book: Book): void => {
        this.http.post(`${this.bookUrl}`, book, this.httpOptions)
            .pipe(
                finalize(() => this.loadData()),
                catchError(this.handleError)
            )
            .subscribe();

    }

    private handleError = (error: HttpErrorResponse) => {
        return throwError(error);
    }

    public orderFinalize = (ids: number[]): Observable<any> => {
        const allDeleteIds = ids.map(id => this.deleteBook(id));
        return forkJoin(allDeleteIds);
    }

}
