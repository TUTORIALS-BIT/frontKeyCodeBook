import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../Services/book.service';
import { GenreService } from '../../Services/genre.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  createBookForm: FormGroup
  allGenre: any
  genreBook: Array<any> = []

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private genreService: GenreService,
    private router: Router,
  ) {
    this.getGenre()
    this.validator()
  }

  ngOnInit(): void {
  }

  validator(){
    this.createBookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      pageNumber: [''],
      publisher: ['', Validators.required],
      publicationDate: ['', Validators.required],
      genre: ['', Validators.required]
    })
  }

  saveBook(){
    if (this.createBookForm.valid){
      this.bookService.createBook(this.createBookForm.value).subscribe(
        (bookCreated) => {
          alert('El libro se creó correctamente')
          this.router.navigate(['/'])
        },
        (error) => {
          console.error('Error -> ', error)
        }
      )
    }else{
      alert('Todos los campos deben estar llenos')
    }
  }

  getGenre(){
    this.genreService.getAll().subscribe(
      (genres) => {
        this.allGenre = genres
      }, 
      (error) => {
        console.error('Error -> ', error)
      }
    )
  }

  saveGenre(event){
    console.log(event.target.value)
    if( this.genreBook.includes(event.target.value) ){
      const index = this.genreBook.indexOf(event.target.value)
      this.genreBook.splice(index, 1)
    }else{
      this.genreBook.push(event.target.value)
    }

    let valueInput: any = ''
    if(this.genreBook.length > 0){
      valueInput = this.genreBook
    }

    this.createBookForm.get('genre').setValue(valueInput)
  }

}
