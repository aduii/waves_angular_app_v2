import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

export interface PeriodicElement {
  position: number;
  search: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, search: 'Search 15', date: '28/04/2023'},
  {position: 2, search: 'Search 14', date: '28/04/2023'},
  {position: 3, search: 'Search 13', date:'28/04/2023'},
  {position: 4, search: 'Search 12', date: '27/04/2023'},
  {position: 5, search: 'Search 11', date: '27/04/2023'},
  {position: 6, search: 'Search 10', date: '25/04/2023'},
  {position: 7, search: 'Search 9', date: '26/04/2023'},
  {position: 8, search: 'Search 8', date: '26/04/2023'},
  {position: 9, search: 'Search 7', date: '26/04/2023'},
  {position: 10, search: 'Search 6', date: '26/04/2023'},
  {position: 11, search: 'Search 5', date: '26/04/2023'},
  {position: 12, search: 'Search 4', date: '26/04/2023'},
  {position: 13, search: 'Search 3', date: '26/04/2023'},
  {position: 14, search: 'Search 2', date: '26/04/2023'},
  {position: 15, search: 'Search 1', date: '26/04/2023'},
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
