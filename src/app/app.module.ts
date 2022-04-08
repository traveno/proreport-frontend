import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DbControlsComponent } from './db-controls/db-controls.component';
import { FetchControlsComponent } from './fetch-controls/fetch-controls.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActivityOverviewComponent } from './activity-overview/activity-overview.component';
import { StatusLogComponent } from './status-log/status-log.component';
import { AboutComponent } from './about/about.component';
import { ConnectionsComponent } from './connections/connections.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportingComponent } from './reporting/reporting.component';
import { AppRoutingModule } from './app-routing.module';
import { QuickButtonsComponent } from './quick-buttons/quick-buttons.component';
import { DefinitionsService } from './definitions.service';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { WorkorderComponent } from './workorder/workorder.component';

@NgModule({
  declarations: [
    AppComponent,
    DbControlsComponent,
    FetchControlsComponent,
    SidebarComponent,
    ActivityOverviewComponent,
    StatusLogComponent,
    AboutComponent,
    ConnectionsComponent,
    DashboardComponent,
    ReportingComponent,
    QuickButtonsComponent,
    LineChartComponent,
    WorkorderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initServices,
      deps: [DefinitionsService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initServices(defService: DefinitionsService) {
  return async () => {
    await defService.loadDefinitions();
  }
}