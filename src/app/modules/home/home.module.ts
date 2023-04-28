import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ScanComponent } from './pages/scan/scan.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './pages/history/history.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogReport } from './pages/scan/dialog-report.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'scan', component: ScanComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'history', component: HistoryComponent },
      { path: '', redirectTo: '/dashboard/scan', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [
    NavigationComponent,
    ScanComponent,
    ReportsComponent,
    DashboardComponent,
    HistoryComponent,
    DialogReport,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class HomeModule {}
