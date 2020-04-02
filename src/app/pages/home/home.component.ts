import { Component, OnInit } from '@angular/core';
import { BookService } from '../admin/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public authorName: string;

  constructor(private bookService: BookService) {
    this.authorName = 'Jonas Padilha';
  }

  ngOnInit() {

  }

}
