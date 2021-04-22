import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../Models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  //apiURL: String = 'https://key-code-b.herokuapp.com';
  apiURL: String = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  createBook(formData){
    return this.http.post<Book>(`${this.apiURL}/book/create`, formData)
  }

  getAll(filter){
    return this.http.get(`${this.apiURL}/book/getAll${filter}`)
    //localhos:3000/book/getAll?searchBy=hghgh
  }

  updateBook(formData, idBook){
    return this.http.put<Book>(`${this.apiURL}/book/update/${idBook}`, formData)
  }

  deleteBook(idBook){
    return this.http.delete(`${this.apiURL}/book/delete/${idBook}`)
  }
}
