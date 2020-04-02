import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {

  public cadastroForm: FormGroup;

  constructor() { }

  ngOnInit() {

    //   this.cadastroForm = new FormGroup({
    //     name: new FormControl(this.recipe.name, [
    //       Validators.required,
    //     ]),
    //     description: new FormControl(this.recipe.description, [
    //       Validators.required,
    //     ]),
    //     imagePath: new FormControl(this.recipe.imagePath, [
    //       Validators.required,
    //     ]),
    //   });
    // }

    this.cadastroForm = new FormGroup({
      id: new FormControl()
    });


  }

}

