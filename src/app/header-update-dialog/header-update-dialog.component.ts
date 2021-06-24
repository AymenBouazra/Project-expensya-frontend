import { Component,  Inject,  OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatchingStringService } from './matching-string.service';

@Component({
  selector: 'app-header-update-dialog',
  templateUrl: './header-update-dialog.component.html',
  styleUrls: ['./header-update-dialog.component.css']
})
export class HeaderUpdateDialogComponent implements OnInit {
  
  id:any;

  constructor( 
    private service: MatchingStringService ,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<HeaderUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.getMatchingStrings()
  }

  getMatchingStrings(){
    this.service.getMatchingString(this.id).subscribe((response: any) => {
      console.log(this.id);
    }, (error) => {
      console.log(error);
    })
  }
  updateStrings(){

  }

}
