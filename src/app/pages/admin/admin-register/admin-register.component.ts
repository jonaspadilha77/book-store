import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {

  public cadastroForm: FormGroup;
  public book: Book = new Book();
  public bookForm: FormGroup;
  public genreOptions = {
    fantasy: false,
    action: false,
    suspense: false,
    romance: false,
    syfy: false,
    mystery: false
  };

  private editMode = false;

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {


    const id = +this.route.snapshot.params.id;
    this.editMode = !!id;

    if (this.editMode) {
      this.bookService.getBook(id).subscribe(book => {
        this.book = book;
        this.checkGenreOptions(this.book.genre);
      });
    }

    this.bookForm = new FormGroup({
      id: new FormControl(this.book.id, [
        Validators.required
      ]),
      name: new FormControl(this.book.name, [
        Validators.required
      ]),
      author: new FormControl(this.book.author, [
        Validators.required
      ]),
      genre: new FormControl(this.book.genre, [
        Validators.required
      ]),
      language: new FormControl(this.book.language, [
        Validators.required
      ]),
      quantity: new FormControl(this.book.quantity, [
        Validators.required
      ])
    });

    console.log(this.book);

  }


  onSubmit(f: FormGroup) {
    const genre = Object.keys(this.genreOptions)
      .map(option => this.genreOptions[option] && option)
      .filter(option => option);
    console.log(genre);
  }

  checkGenreOptions(options: string[]) {
    options.forEach(option => {
      if (this.genreOptions.hasOwnProperty(option)) {
        this.genreOptions[option] = true;
      }
    });
  }
}
