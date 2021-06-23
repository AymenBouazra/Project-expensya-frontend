import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../matching-header/app.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort} from '@angular/material/sort';

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
  


  constructor(private service: AppService, private targetElement: ElementRef) { }
  
  ngOnInit(): void {
    this.getHeader()
  }
  

  getHeader(){
    this.service.getAllHeaders().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.sort);
    }, (error) => {
      console.log(error);
    })
  }
}