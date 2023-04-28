import { Component, OnInit } from '@angular/core';
import { DialogReport } from './dialog-report.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

interface IVulnerabilityCard {
  type: string;
  cveCode: string;
  description: string;
  impact: number;
}

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  ngOnInit() {}
  vulnerabilitiesArr: IVulnerabilityCard[] = [
    {
      type: 'DNS',
      cveCode: 'CVE-2019-1234',
      description: 'DNS Vulnerability description',
      impact: 9.8,
    },
    {
      type: 'SQL',
      cveCode: 'CVE-2019-1235',
      description: 'SQL Vulnerability description',
      impact: 7.5,
    },
    {
      type: 'SQL',
      cveCode: 'CVE-2019-1236',
      description: 'SQL Vulnerability description',
      impact: 2.0,
    },
  ];

  constructor(public dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogReport, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
