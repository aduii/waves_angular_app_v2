import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/modules/auth/pages/login/login.service';
import { DialogReportService } from './dialog-report.service';
import { ScanService } from './scan.service';
import * as moment from 'moment-timezone';
import { format } from 'date-fns';

interface IDialogReport {
  user_id: number;
  username: string;
  reportName: string;
  date: string;
}

@Component({
  selector: 'dialog-report',
  templateUrl: './dialog-report.component.html',
  styleUrls: ['./dialog-report.component.css'],
})
export class DialogReport implements OnInit {
  fecha: string;
  last_report_id?: number;
  IDialogReportArr: IDialogReport[] = [
    {
      user_id: 1,
      username: '',
      reportName: '',
      date: '',
    },
  ];

  reportData = {
    name: '',
    date: '',
    ip: '',
    user_id: 1,
  };

  get_scan: any;
  ngOnInit(): void {
    const get_user = this.loginService.getUser();
    const get_ip = this.scanService.getIp();
    if (get_user) {
      this.IDialogReportArr[0].user_id = get_user.id;
      this.IDialogReportArr[0].username = get_user.name;
      this.IDialogReportArr[0].date = this.fecha;
      // this.IDialogReportArr[0].date = this.fecha.toISOString().slice(0, 10);
      console.log(get_user);
    }
    if (get_ip) {
      this.reportData.ip = get_ip.ip;
      console.log(get_ip);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<DialogReport>,
    private loginService: LoginService,
    private dialogReportService: DialogReportService,
    private scanService: ScanService
  ) {
    // this.fecha = moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss');
    const fecha = new Date();
    this.fecha = fecha.toLocaleString('es-PE', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    this.fecha = format(fecha, 'yyyy-MM-dd HH:mm:ss');
  }

  registerVulnerability() {}

  createReport() {
    let vulnerabilityData: any;
    this.reportData = {
      name: this.IDialogReportArr[0].reportName,
      date: this.IDialogReportArr[0].date,
      ip: this.reportData.ip,
      user_id: this.IDialogReportArr[0].user_id,
    };
    this.dialogReportService.createReport(this.reportData).subscribe(
      (response) => {
        // Aquí puedes manejar la respuesta del servidor después de crear el reporte
        this.get_scan = this.scanService.getScan();
        console.log(this.get_scan);
        console.log('Report created:', response);
        this.dialogReportService
          .getLatestReport(this.IDialogReportArr[0].user_id)
          .subscribe(
            (response) => {
              console.log(response); // Realiza las operaciones necesarias con la respuesta del API
              this.last_report_id = response.latest_report_id;
              for (let vulnerability in this.get_scan.scan) {
                vulnerabilityData = {
                  cveCode: '',
                  description: '',
                  exploit: '',
                  exploitLink: '',
                  impact: 0.0,
                  report_id: 0,
                };
                if (this.get_scan.scan.hasOwnProperty(vulnerability)) {
                  const scanData = this.get_scan.scan[vulnerability];
                  vulnerabilityData.cveCode = scanData.cveCode;
                  vulnerabilityData.description = scanData.description?scanData.description:'Without description';
                  vulnerabilityData.exploit = scanData.exploit?scanData.exploit:'Without exploit';
                  vulnerabilityData.exploitLink = scanData.exploitLink?scanData.exploitLink:'Without exploit link';
                  vulnerabilityData.impact = parseFloat(scanData.impact);
                  vulnerabilityData.report_id = this.last_report_id;
                  // registerVulnerability
                  this.dialogReportService
                    .registerVulnerability(vulnerabilityData)
                    .subscribe(
                      (response) => {
                        console.log(
                          'Vulnerability registered successfully:',
                          response
                        );
                        // Aquí puedes realizar acciones adicionales después de registrar la vulnerabilidad
                      },
                      (error) => {
                        console.error(
                          'Error registering vulnerability:',
                          error
                        );
                      }
                    );
                    // END registerVulnerability
                }
              }
            },
            (error) => {
              console.error(error); // Maneja el error si ocurre
            }
          );
      },
      (error) => {
        // Aquí puedes manejar los errores en caso de que ocurra alguno
        console.error('Error creating report:', error);
      }
    );
  }
}
