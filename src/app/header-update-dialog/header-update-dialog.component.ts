import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-header-update-dialog',
  templateUrl: './header-update-dialog.component.html',
  styleUrls: ['./header-update-dialog.component.css'],
})
export class HeaderUpdateDialogComponent implements OnInit {
  formMatchingString = new FormArray([]);
  submitted = false;
  formGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<HeaderUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.showStrings();
  }

  showStrings() {
    this.data.matchingString.forEach((string: any) => {
      this.formMatchingString.push(
        new FormControl(string, Validators.required)
      );
    });
  }

  addString() {
    this.formMatchingString.push(new FormControl('', Validators.required));
  }
  removeString(index: number) {
    this.formMatchingString.removeAt(index);
  }

  updateStrings() {
    this.submitted = true;
    if (this.formMatchingString.invalid) {
      return;
    } 
    this.dialogRef.close(this.formMatchingString.value);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
