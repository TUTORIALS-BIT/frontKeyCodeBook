import { Component, OnInit } from '@angular/core';
import { BookService  } from '../../Services/book.service';
import { StorageService } from '../../Services/storage.service';
import { Router } from '@angular/router';
const swal = require('sweetalert')


@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  allBooks: any;
  roleUser: Boolean = false;
  search: String;

  constructor(
    private bookService: BookService,
    private storageService: StorageService,
    private route: Router
  ) {
    let dataUser = this.storageService.dataUser()
    if(dataUser.role == 'Admin'){
      this.roleUser = true
    }
  }

  ngOnInit(): void {
    this.loadBook()
  }

  /*getAll(){
    this.bookService.getAll().subscribe(
      (books) => {
         this.allBooks = books
      },
      (error) => {
        console.error('Error -> ', error)
      }
    )
  }*/

  updateBook(book){
    localStorage.setItem(`book-${book._id}`, JSON.stringify(book) )
    this.route.navigate([`/update-book/${book._id}`])
  }

  removeBook(id){
    this.bookService.deleteBook(id).subscribe(
      (bookDeleted) =>{
        swal('Proceso correcto', 'Libro eliminado correctamente', 'success')
        //alert('Libro eliminado correctamente')
        this.route.navigateByUrl('/', { skipLocationChange: true } ).then(
          () => {
            this.route.navigate(['/list-book'])
          }
        )
      },
      (error) => {
        console.error('Error al eliminar el libro, ', error)
      }

    )
  }


  loadBook(){
    const filter = (typeof this.search == 'string' && this.search.length > 0) ? `?searchBy=${this.search}` : ''
    this.bookService.getAll(filter).subscribe(
        (books)=>{
          this.allBooks = books
        },
        (error) => {
          console.error('Error -> ', error)
        }
    )
  }

}
