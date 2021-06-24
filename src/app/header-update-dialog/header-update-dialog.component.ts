import { Component,  OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatchingStringService } from './matching-string.service';

@Component({
  selector: 'app-header-update-dialog',
  templateUrl: './header-update-dialog.component.html',
  styleUrls: ['./header-update-dialog.component.css']
})
export class HeaderUpdateDialogComponent implements OnInit {
  
  matchingString = new FormControl('');

  id:any;

  constructor( private service: MatchingStringService ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id =  this.route.snapshot.params['id'];
    this.getMatchingStrings()
  }

  getMatchingStrings(){
    this.service.getMatchingString(this.id).subscribe((response: any) => {

    }, (error) => {
      console.log(error);
    })
  }

  updateStrings(){

  }
}
