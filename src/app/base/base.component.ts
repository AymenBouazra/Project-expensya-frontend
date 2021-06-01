import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  isLinear = false;
  expensyaList: string[] = [
    'LastName',
    'FirstName',
    'Language',
    'PayId',
    'PayId2',
    'PayId3',
    'PayId4',
    'PayId5',
    'PayId6',
    'Mail',
    'ManagerMail',
    'ManagerPayId',
    'IsAdmin',
    'IsAccountant',
    'Tags',
    'LocalCountry',
    'LocalCurrency',
    'ReviewerMail',
    'ReviewerPayId',
    'DefaultProjectExternalId',
    'IsActive',
    'MailAlias',
    'MileageRate',
    'IKReference',
  ];
  constructor(
    private importService: AppService,
    private snackBar: MatSnackBar,
  ) {}

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

  uploadFileAndMatching(index: number,stepper:MatStepper) {
    console.log('thefile ' + this.files[0]);
    this.importService.upload(this.files[0]).subscribe(
      (response: any) => {
        console.log(response);
        
        this.snackBar.open(
          'File uploaded',
          'Close',
          { duration: 3000 }
        );
        stepper.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
