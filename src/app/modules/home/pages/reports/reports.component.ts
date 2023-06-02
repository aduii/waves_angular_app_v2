import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface IReport {
  id: number;
  name: string;
  date: string;
}

interface IVulnerability {
  cveCode: string;
  description: string;
  exploit: string;
  exploit_link: string;
  impact: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  myControl = new FormControl<string | IReport>('');
  options: IReport[] = [
    { id: 1, name: 'Report Name 1', date: '2023-04-25' },
    { id: 2, name: 'Report Name 2', date: '2023-04-26' },
    { id: 3, name: 'Report Name 3', date: '2023-04-27' },
    { id: 4, name: 'Report Name 4', date: '2023-05-15' },
  ];
  filteredOptions!: Observable<IReport[]>;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  constructor(private http: HttpClient, private renderer2: Renderer2) {}

  saveReport(option: IReport) {
    // this.http.get('/assets/html_report.html', { responseType: 'text' }).subscribe(html => {
    //   const blob = new Blob([html], { type: 'text/html' });
    //   saveAs(blob, 'my-file.html');
    // });
    var vulnerabilityBody:string= '';
    let vulnerabilityArray: IVulnerability[] = [
      {
        cveCode: 'CVE-2021-23017',
        description: 'A security issue in nginx resolver was identified, which might allow an attacker who is able to forge UDP packets from the DNS server to cause 1-byte memory overwrite, resulting in worker process crash or potential other impact.',
        exploit:'Nginx 1.20.0 - Denial of Service (DOS)',
        exploit_link: 'https://www.exploit-db.com/exploits/50973',
        impact: 6.4,
      },
      {
        cveCode: 'CVE-2021-3618',
        description: `ALPACA is an application layer protocol content confusion attack, exploiting TLS servers implementing different protocols but using compatible certificates, such as multi-domain or wildcard certificates. A MiTM attacker having access to victim's traffic at the TCP/IP layer can redirect traffic from one subdomain to another, resulting in a valid TLS session. This breaks the authentication of TLS and cross-protocol attacks may be possible where the behavior of one protocol service may compromise the other at the application layer.`,
        exploit:'',
        exploit_link:'',
        impact: 4.9,
      },
      {
        cveCode: 'CVE-2022-41741',
        description: 'NGINX Open Source before versions 1.23.2 and 1.22.1, NGINX Open Source Subscription before versions R2 P1 and R1 P1, and NGINX Plus before versions R27 P1 and R26 P1 have a vulnerability in the module ngx_http_mp4_module that might allow a local attacker to corrupt NGINX worker memory, resulting in its termination or potential other impact using a specially crafted audio or video file. The issue affects only NGINX products that are built with the ngx_http_mp4_module, when the mp4 directive is used in the configuration file. Further, the attack is possible only if an attacker can trigger processing of a specially crafted audio or video file with the module ngx_http_mp4_module.',
        exploit:'',
        exploit_link:'',
        impact: 5.9,
      },
      {
        cveCode: 'CVE-2022-41742',
        description: 'NGINX Open Source before versions 1.23.2 and 1.22.1, NGINX Open Source Subscription before versions R2 P1 and R1 P1, and NGINX Plus before versions R27 P1 and R26 P1 have a vulnerability in the module ngx_http_mp4_module that might allow a local attacker to cause a worker process crash, or might result in worker process memory disclosure by using a specially crafted audio or video file. The issue affects only NGINX products that are built with the module ngx_http_mp4_module, when the mp4 directive is used in the configuration file. Further, the attack is possible only if an attacker can trigger processing of a specially crafted audio or video file with the module ngx_http_mp4_module.',
        exploit:'',
        exploit_link:'',
        impact: 5.2,
      },
    ];

    for (let vulnerabilityItem of vulnerabilityArray) {
      var description_style = 'display:none;';
      var exploit_style = 'display:none;';
      var exploit_link_style = 'display:none;';

      if(vulnerabilityItem.description != ''){
        description_style = 'display:block;';
      }
      if(vulnerabilityItem.exploit != ''){
        exploit_style = 'display:block;';
      }
      if(vulnerabilityItem.exploit_link != ''){
        exploit_link_style = 'display:block;';
      }

      vulnerabilityBody += `
      <p>CVE Code: ${vulnerabilityItem.cveCode}</p>
      <blockquote><p style="${description_style}">Description: ${vulnerabilityItem.description}</p></blockquote>
      <blockquote><p style="${exploit_link_style}">Exploit: <a href="${vulnerabilityItem.exploit_link}" target="_blank">${vulnerabilityItem.exploit}</a> </p> </blockquote>
      <blockquote><p>Impact: ${vulnerabilityItem.impact}</p></blockquote>
      `
    }


    const html = `
    <!doctype html>
    <html>
      <head>
        <title>WAVES Scanning Report</title>
      </head>
      <body>
        <h1>WAVES Scanning Report</h1>
        <h2>Report ID ${option.id}</h2>
        <h3>Date: ${option.date}</h3>
      </body>
      ${vulnerabilityBody}
    </html>
    `;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    saveAs(blob, 'doc_reportid_'+option.id+'.html');
  }

  displayFn(report: IReport): string {
    return report && report.name ? report.name : '';
  }

  private _filter(name: string): IReport[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
