import { EventEmitter, Injectable,Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../../api/api-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogReportService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  createReport(reportData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/reports/register_report/`, reportData, { headers: headers });
  }

  getLatestReport(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/get_latest_report_id/?user_id=${userId}`);
  }

  registerVulnerability(vulnerabilityData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vulnerabilities/register_vulnerability/`, vulnerabilityData);
  }

}
