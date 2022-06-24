import { HttpCacheService } from './services/http-cache.service';
import { LogResponseIntercepotr } from './services/log-response.interceptor';
import { AddHeaderInterceptor } from './services/add-header.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyComponent } from './components/company/company.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanyFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogResponseIntercepotr, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: HttpCacheService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CompanyFormComponent]
})
export class AppModule { }
