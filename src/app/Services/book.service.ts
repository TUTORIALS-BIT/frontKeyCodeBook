import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../Models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiURL: String = 'https://key-code-b.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  createBook(formData){
    return this.http.post<Book>(`${this.apiURL}/book/create`, formData)
  }
}
