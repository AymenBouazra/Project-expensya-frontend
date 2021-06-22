import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../matching-header/app.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})

export class HeadersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Header', 'Matching string'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private service: AppService) { }
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
  }

  getHeader(){
    this.service.getAllHeaders().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource<any>(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (error) => {
      console.log(error);
    })
  }
}