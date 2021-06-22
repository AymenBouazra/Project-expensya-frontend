import { Component, OnInit } from '@angular/core';
import { AppService } from '../matching-header/app.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {
  listHeader:any
  constructor(private service:AppService) { }

  ngOnInit(): void {
    this.service.getAllHeaders().subscribe((response) => {
      this.listHeader= response

    }, (error) => {
      console.log(error);
    })
  }

}
