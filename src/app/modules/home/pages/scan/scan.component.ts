import { Component, OnInit } from '@angular/core';
import { DialogReport } from './dialog-report.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/modules/auth/pages/login/login.service';
import { ScanService } from './scan.service';

interface IVulnerabilityCard {
  cveCode: string;
  description: string;
  exploit: string;
  exploitLink: string;
  impact: number;
}

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  ip: string = '';

  ngOnInit(): void {}
  vulnerabilitiesArr: IVulnerabilityCard[] = [];

  constructor(public dialog: MatDialog, private scanService: ScanService) {}

  onScan() {
    this.scanService.getVulnerabilities(this.ip).subscribe(
      (data: any) => {
        // Maneja la respuesta del API aquí
        this.scanService.setIp({
          ip: this.ip,
          });
        this.vulnerabilitiesArr = data["result"];
        this.scanService.setScan({
          scan: this.vulnerabilitiesArr,
          });
      },
      (error) => {
        // Maneja los errores aquí
        console.error(error);
      }
    );
  }

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
