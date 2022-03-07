import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DbControlsComponent } from './db-controls/db-controls.component';
import { FetchControlsComponent } from './fetch-controls/fetch-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    DbControlsComponent,
    FetchControlsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
