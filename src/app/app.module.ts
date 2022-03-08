import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DbControlsComponent } from './db-controls/db-controls.component';
import { FetchControlsComponent } from './fetch-controls/fetch-controls.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActivityOverviewComponent } from './activity-overview/activity-overview.component';
import { StatusLogComponent } from './status-log/status-log.component';
import { AboutComponent } from './about/about.component';
import { ConnectionsComponent } from './connections/connections.component';

@NgModule({
  declarations: [
    AppComponent,
    DbControlsComponent,
    FetchControlsComponent,
    SidebarComponent,
    ActivityOverviewComponent,
    StatusLogComponent,
    AboutComponent,
    ConnectionsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
