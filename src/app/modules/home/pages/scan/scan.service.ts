import { EventEmitter, Injectable,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../api/api-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private apiUrl = API_URL;

  private ipValue: any;
  private scanValue: any;
  ip: EventEmitter<any> = new EventEmitter();
  scan: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getVulnerabilities(ip: string) {
    return this.http.get(`${this.apiUrl}/vulnerabilities/web_server_grab/?ip=${ip}`);
  }

  setIp(ip: any) {
    this.ipValue = ip;
    this.ip.emit(ip);
  }

  getIp() {
    return this.ipValue;
  }

  setScan(scan:any){
    this.scanValue = scan;
    this.scan.emit(scan);
  }

  getScan(){
    return this.scanValue;
  }

}
