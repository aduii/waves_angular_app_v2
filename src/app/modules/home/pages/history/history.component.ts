import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/modules/auth/pages/login/login.service';
import { HistoryService } from './history.service';

export interface ReportHistory {
  position: number;
  search: string;
  date: string;
}

export interface Report {
  id: number;
  name: string;
  date: string;
  ip: string;
  user: number;
}
// const ELEMENT_DATA: ReportHistory[] = [
//   { position: 1, search: '10.10.84.211', date: '2023-05-15' },
//   { position: 2, search: '10.10.84.211', date: '2023-04-28' },
//   { position: 3, search: 'Search 13', date: '2023-04-28' },
//   { position: 4, search: 'Search 12', date: '2023-04-28' },
//   { position: 5, search: 'Search 11', date: '2023-04-28' },
// ];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  user_id: any;
  ELEMENT_DATA: ReportHistory[] = []
  ELEMENT_AUX: Report[] = [];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  displayedColumns: string[] = ['position', 'search', 'date'];
  // dataSource: ReportHistory[] = this.ELEMENT_DATA;
  dataSource: ReportHistory[] = [];
  clickedRows = new Set<ReportHistory>();

  constructor(private loginService: LoginService, private historyService: HistoryService) {}

  ngOnInit(): void {
    let cc_search = 1;
    const get_user = this.loginService.getUser();
    if (get_user) {
      this.user_id = get_user.id;
    }
    this.historyService.getReports(this.user_id).subscribe(
      (response) => {
        this.ELEMENT_AUX = response;
        console.log(this.ELEMENT_AUX);
        // Transformar ELEMENT_AUX a ELEMENT_DATA
        this.ELEMENT_DATA = this.ELEMENT_AUX.map((item) => ({
          position: cc_search++,
          search: item.ip,
          date: item.date.slice(0,10)
        }));

        this.dataSource = this.ELEMENT_DATA;

        this.range.valueChanges.subscribe(() => {
          this.applyDateFilter();
        });



        this.range.valueChanges.subscribe(() => {
          this.applyDateFilter();
        });
      },
      (error) => {
        console.error('Error to Get Reports:', error);
      }
    );

  }

  applyDateFilter(): void {
    const start = this.range.controls.start.value;
    const end = this.range.controls.end.value;

    if (!start && !end) {
      this.dataSource = this.ELEMENT_DATA; // Sin filtro, mostrar todos los datos
    } else {
      this.dataSource = this.ELEMENT_DATA.filter((item) => {
        const itemDate = new Date(item.date);
        if (start && end) {
          return itemDate >= start && itemDate <= end;
        } else if (start) {
          return itemDate >= start;
        } else if (end) {
          return itemDate <= end;
        }else {
          return false; // Agregar esta cláusula else para devolver un valor por defecto
        }
      });
    }
  }
}
