import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../matching-header/app.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HeaderUpdateDialogComponent } from '../header-update-dialog/header-update-dialog.component';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})

export class HeadersComponent implements OnInit{
  displayedColumns: string[] = ['id', 'header', 'matchingString','update'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort:MatSort
  
  constructor(private service: AppService, public Dialog:MatDialog) { }
  

  ngOnInit(): void {
    this.getHeader()
  }
  

  getHeader(){
    this.service.getAllHeaders().subscribe((response: any) => {
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.sort);
    }, (error) => {
      console.log(error);
    })
  }


  updateMatchingString(data){
    const dialogRef = this.Dialog.open(HeaderUpdateDialogComponent,{
      width: '700px',
      data: {matchingString : data.matchingString }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      console.log('The dialog was closed');
    });
  }
  
}