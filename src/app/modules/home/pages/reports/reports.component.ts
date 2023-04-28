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
  type: string;
  cveCode: string;
  description: string;
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
    { id: 4, name: 'Report Name 4', date: '2023-04-28' },
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
        type: 'DNS',
        cveCode: 'CVE-2019-1234',
        description: "Apache Struts versions 2.3 to 2.3.34 and 2.5 to 2.5.16 suffer from possible Remote Code Execution when alwaysSelectFullNamespace is true (either by user or a plugin like Convention Plugin) and then: results are used with no namespace and in same time, its upper package have no or wildcard namespace and similar to results, same possibility when using url tag which doesn't have value and action set and in same time, its upper package have no or wildcard namespace.",
        impact: 9.8,
      },
      {
        type: '',
        cveCode: 'CVE-2019-1235',
        description: "Apache Struts versions 2.3 to 2.3.34 and 2.5 to 2.5.16 suffer from possible Remote Code Execution when alwaysSelectFullNamespace is true (either by user or a plugin like Convention Plugin) and then: results are used with no namespace and in same time, its upper package have no or wildcard namespace and similar to results, same possibility when using url tag which doesn't have value and action set and in same time, its upper package have no or wildcard namespace.",
        impact: 7.5,
      },
      {
        type: 'SQL',
        cveCode: 'CVE-2019-1236',
        description: "Apache Struts versions 2.3 to 2.3.34 and 2.5 to 2.5.16 suffer from possible Remote Code Execution when alwaysSelectFullNamespace is true (either by user or a plugin like Convention Plugin) and then: results are used with no namespace and in same time, its upper package have no or wildcard namespace and similar to results, same possibility when using url tag which doesn't have value and action set and in same time, its upper package have no or wildcard namespace.",
        impact: 2.0,
      },
    ];

    for (let vulnerabilityItem of vulnerabilityArray) {
      vulnerabilityBody += `
      <p>CVE Code: ${vulnerabilityItem.cveCode}</p>
      <blockquote><p>CVE Code: ${vulnerabilityItem.cveCode}</p></blockquote>
      <blockquote><p>Type: ${vulnerabilityItem.type}</p></blockquote>
      <blockquote><p>Description: ${vulnerabilityItem.description}</p></blockquote>
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
    saveAs(blob, 'archivo.html');
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
