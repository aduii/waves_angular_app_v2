import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

interface IDialogReport {
  id: number;
  user: string;
  reportName: string;
  date: string;
}

@Component({
  selector: 'dialog-report',
  templateUrl: './dialog-report.component.html',
  styleUrls: ['./dialog-report.component.css'],
})
export class DialogReport implements OnInit {
  ngOnInit() {}
  IDialogReportArr: IDialogReport[] = [
    {
      id: 1,
      user: 'Alex Daniel Juep Sifuentes',
      reportName: 'Report 1 Nickname',
      date: '2023-04-20',
    },
  ];
  constructor(public dialogRef: MatDialogRef<DialogReport>) {}
}
