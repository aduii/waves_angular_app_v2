import { EventEmitter, Injectable,Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../../api/api-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  HistoryService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  getReports(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/get_reports_by_user_id/?user_id=${userId}`);
  }
}
