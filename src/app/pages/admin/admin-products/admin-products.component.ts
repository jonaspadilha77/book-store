import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs';
import { Book } from '../book.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public books: Book[] = [];
  private bookSubs: Subscription;


  ngOnInit() {
    this.bookSubs = this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  ngOnDestroy() {
    this.bookSubs.unsubscribe();
  }

  openDetail(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  openEdit(id: number) {
    this.router.navigate([id + '/edit'], { relativeTo: this.route });
  }

  onDelete(id: number) {
    this.bookService.deleteBook(id).subscribe();
  }

}
