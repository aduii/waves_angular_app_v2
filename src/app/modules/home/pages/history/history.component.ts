import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

export interface PeriodicElement {
  position: number;
  search: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, search: '10.10.84.211', date: '15/05/2023'},
  {position: 2, search: '10.10.84.211', date: '28/04/2023'},
  {position: 3, search: 'Search 13', date:'28/04/2023'},
  {position: 4, search: 'Search 12', date: '27/04/2023'},
  {position: 5, search: 'Search 11', date: '27/04/2023'},
];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  displayedColumns: string[] = ['position', 'search', 'date'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
}
