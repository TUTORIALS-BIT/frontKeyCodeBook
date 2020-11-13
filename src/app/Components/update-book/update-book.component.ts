import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../Services/book.service';
import { GenreService } from '../../Services/genre.service';
import * as moment from 'moment';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  createBookForm: FormGroup
  allGenre: any
  genreBook: Array<any> = []
  idBook: String

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private genreService: GenreService,
    private router: Router,
    private routeParams: ActivatedRoute
  ) {
    this.getGenre()
    this.validator()
  }

  ngOnInit(): void {
  }

  validator(){
    this.idBook = this.routeParams.snapshot.paramMap.get('id')
    let storageBook = localStorage.getItem(`book-${this.idBook}`)
    let dataBook = JSON.parse(storageBook)

    /** Se guardan los generos que tiene el libro en la variable genreBook  */
    dataBook.genre.forEach(genre => {
        this.genreBook.push(genre._id)
    });

    const date = moment(dataBook.publicationDate).format('YYYY-MM-DD')

    this.createBookForm = this.formBuilder.group({
      name: [dataBook.name, Validators.required],
      author: [dataBook.author, Validators.required],
      pageNumber: [dataBook.pageNumber],
      publisher: [dataBook.publisher, Validators.required],
      publicationDate: [date, Validators.required],
      genre: [this.genreBook, Validators.required]
    })
  }

  saveBook(){
    if (this.createBookForm.valid){
      this.bookService.updateBook(this.createBookForm.value, this.idBook).subscribe(
        (bookCreated) => {
          alert('El libro se modificó correctamente')
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
