import { EventEmitter, Injectable,Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../../api/api-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  ReportsService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  getReports(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/get_reports_by_user_id/?user_id=${userId}`);
  }

  getVulnerabilitiesByReportId(reportId: number) {
    return this.http.get<any>(`${this.apiUrl}/vulnerabilities/get_vulnerabilities_by_report_id/?report_id=${reportId}`);
  }

  getReportById(reportId: number) {
    return this.http.get(`${this.apiUrl}/reports/${reportId}/get_report_by_id/`);
  }

}
