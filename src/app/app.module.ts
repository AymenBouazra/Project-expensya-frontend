import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Page404Component } from './page404/page404.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressComponent } from './progress/progress.component';
import { DndDirective } from './dnd.directive';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HeadersComponent } from './headers/headers.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TokenInterceptor } from './http-interceptor/token.interceptor';
import { HeaderUpdateDialogComponent } from './header-update-dialog/header-update-dialog.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    ProgressComponent,
    DndDirective,
    HeadersComponent,
    HeaderUpdateDialogComponent,
    MainNavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
  ],

  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  {
    provide : HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi   : true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
