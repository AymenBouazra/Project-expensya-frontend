import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../matching-header/app.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HeaderUpdateDialogComponent } from '../header-update-dialog/header-update-dialog.component';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css'],
})
export class HeadersComponent implements OnInit {
  isLoggedIn : Observable<boolean>;
  displayedColumns: string[] = ['id', 'header', 'matchingString', 'update'];
  displayedColumnsnotconnected: string[] = ['id', 'header', 'matchingString'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  
  constructor(loginService : LoginService, private service: AppService, public Dialog: MatDialog) {
    this.isLoggedIn = loginService.isLoggedIn();
  }

  ngOnInit(): void {
    this.getHeader();
  }

  getHeader() {
    this.service.getAllHeaders().subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateMatchingString(data: any) {
    const dialogRef = this.Dialog.open(HeaderUpdateDialogComponent, {
      width: '700px',
      data: { matchingString: data.matchingString, id: data._id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null && result!==undefined) {
        //update service
        data.matchingString = result;
        this.service.updateMatching(data._id, data.matchingString).subscribe((response) => {
          });
      }
    });
  }
}
