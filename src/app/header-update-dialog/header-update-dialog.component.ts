import { Component,  OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../matching-header/app.service';
import { MatchingStringService } from './matching-string.service';

@Component({
  selector: 'app-header-update-dialog',
  templateUrl: './header-update-dialog.component.html',
  styleUrls: ['./header-update-dialog.component.css']
})
export class HeaderUpdateDialogComponent implements OnInit {
  displayedColumns: string[] = ['matchingString','update'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort:MatSort
  
  id:any;

  constructor( private service: MatchingStringService ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.getMatchingStrings()
  }

  getMatchingStrings(){
    this.service.getMatchingString(this.id).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.sort);
    }, (error) => {
      console.log(error);
    })
  }

}
