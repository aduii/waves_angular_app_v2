import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/pages/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  ngOnInit(): void {
  }


  constructor(private loginService: LoginService) {

  }
}
