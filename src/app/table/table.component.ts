import { Component, OnInit, ViewChild, AfterViewInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
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
  pageEvent: any;
  columnsKey: any[] = [];
  dataSource = new MatTableDataSource();
  isData: boolean;
  sortedData: unknown[];
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns.forEach((data) => {
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
      this.dataEvent.next({ event: 'data', start, end });
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
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log('confirmed' + confirmed);
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.dataEvent.next({ event: 'delete', element });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.dataSource.data = data.sort((dataA, dataB) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(dataA[sort.active], dataB[sort.active], isAsc);
    });

  }


  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


}

import { MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

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
    @Inject(MAT_DIALOG_DATA) data: any,
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
