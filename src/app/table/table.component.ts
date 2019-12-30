import { Component, OnInit, ViewChild, AfterViewInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() pageSizeOptions;
  @Input() pageSize;
  @Input() currentPage = 0;
  @Input() totalSize;
  @Input() elementData;
  @Input() displayedColumns;
  @Input() parentSubject: Subject<any>;
  @Output() dataEvent = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columnsKey: any[] = [];
  dataSource = new MatTableDataSource();
  isData: boolean;
  constructor(private dialog: MatDialog,  private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.displayedColumns.forEach((data, index) => {
      this.columnsKey.push(data.apiKey);
    });
    this.dataSource.data = this.elementData;
    this.dataSource.sort = this.sort;

    this.parentSubject.subscribe(event => {
      this.dataSource.data = event;
      this.totalSize = event.length;
      this.isDataAvailable();
    });

    this.isDataAvailable();
  }

  isDataAvailable() {

    if (this.dataSource.data.length === 0) {
      this.isData = false;
    } else {
      this.isData = true;
    }
  }
  handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    console.log(end);
    console.log(this.totalSize);
    if (end >= this.totalSize) {
      this.dataEvent.next({ start, end });
    }
  }
  onDetail(element) {
    console.log(JSON.stringify(element));
  }

  onDetele(element) {
    console.log(JSON.stringify(element));

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    // const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log('confirmed' + confirmed);
      if (confirmed) {
        // snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        // snack.dismiss();
        // this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
        //   duration: 2000,
        // });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class ConfirmationDialog {
  message = 'Are you sure?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialog>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
