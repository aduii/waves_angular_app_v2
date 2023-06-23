import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../api/api-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  createUser(user: any) {
    return this.http.post(this.apiUrl+'/users/', user);
  }

  getUserByEmail(email:string): Observable<any> {
    return this.http.get<any>(this.apiUrl+`/users/search/?email=${email}`);
  }
}
