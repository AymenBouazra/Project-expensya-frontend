import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matching-header',
  templateUrl: './matching-header.component.html',
  styleUrls: ['./matching-header.component.css']
})
export class MatchingHeaderComponent implements OnInit {
  csv = false;
  tab = [];
  values = [];
  data = [];
  submitted = false;
  isLinear = false;
  options = [];
  hideConfirm = false;
  fileName: any;
  startImport = false;
  nothingToMatch = false;
  expensyaList: string[] = [];
  matching: FormGroup
  headersNotMatched: any;
  headerMatched: any;
  selectedKey = '';
  headersImported = [];

  constructor(private appService: AppService,private router:Router, private snackBar: MatSnackBar) {
    this.matching = new FormGroup({
      matched: new FormArray([]),
      notMatched: new FormArray([]),
    });
  }

  ngOnInit(): void {}
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;
  files: any[] = [];

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      alert('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
    if (this.files[0].name.includes('.csv')) {
      this.csv = true
    }
    
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = '';
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  get getMatched(): FormArray {
    return this.matching.get('matched') as FormArray;
  }

  get getNotMatched(): FormArray {
    return this.matching.get('notMatched') as FormArray;
  }

  uploadFileAndMatching(index: number, stepper: MatStepper) {
    this.appService.upload(this.files[0]).subscribe(
      (response: any) => {
        this.fileName = response.filename;
        this.headerMatched = response.headersMatched;
        this.headersNotMatched = response.headersNotMatched;
        response.headersNotMatched.forEach((header: any) => {
          this.getNotMatched.push(
            new FormGroup({
              key: new FormControl(header.key),
              affectedKey: new FormControl('', [Validators.required]),
            })
          );
        });
        response.headersMatched.forEach((header: any) => {
          this.getMatched.push(
            new FormGroup({
              header: new FormControl(header.key),
              matchingString: new FormControl(header.matchedKey),
            })
          );
        });
        this.snackBar.open('File uploaded', 'Close', { duration: 3000 });
        stepper.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changevalues(e, i) {
    this.selectedKey = e;
    this.options[i] = this.selectedKey;
  }

  confirm() {
    this.options.forEach((key, i) => {
      this.getMatched.push(
        new FormGroup({
          header: new FormControl(this.headersNotMatched[i].key),
          matchingString: new FormControl(key),
        })
      );
    });
    while (this.getNotMatched.length !== 0) {
      this.getNotMatched.removeAt(0);
    }
    this.hideConfirm = true;
    this.startImport = true;
    this.nothingToMatch = true;
  }

  startImporting(stepper: MatStepper) {
    this.appService
      .import(this.getMatched.value, this.fileName)
      .subscribe((res) => {
        this.data.push(Object.values(res));
        let keys = Object.keys(res[0]);
        for (let i = 0; i < this.data[0].length; i++) {
          delete (this.data[0])[i]._id
          delete (this.data[0])[i].createdAt
          delete (this.data[0])[i].updatedAt
        }
        for (let i = 0; i < keys.length; i++) {
          if (
            keys[i] !== '_id' &&
            keys[i] !== 'createdAt' &&
            keys[i] !== 'updatedAt'
          ) {
            this.tab.push(keys[i]);
          }
        }
        stepper.next();
      });
  }
}
