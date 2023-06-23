import { EventEmitter, Injectable,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../api/api-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = API_URL;
  // @Output() user: EventEmitter<any> = new EventEmitter();
  private userValue: any;
  user: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getUserByEmail(email:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+`/users/search/?email=${email}`);
  }

  setUser(user: any) {
    this.userValue = user;
    this.user.emit(user);
  }

  getUser() {
    return this.userValue;
  }



}
