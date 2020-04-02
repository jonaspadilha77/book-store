import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../pages/admin/book.model';
import { BookService } from '../pages/admin/book.service';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  public book: Book;
  ngOnInit() {
    const id = +this.route.snapshot.params.id;

    this.bookService.getBook(id).subscribe(book => {
      this.book = book;
    });

  }

}
