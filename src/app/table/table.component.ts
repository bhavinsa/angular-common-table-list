import { Component, OnInit, ViewChild, AfterViewInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() pageSizeOptions;
  @Input() pageSize;
  @Input() elementData;
  @Input() displayedColumns;
  @Input() listingContainerSubject: Subject<any>;
  @Input() disabled = false;
  @Input() hidePageSize = false;
  @Input() showFirstLastButtons = false;
  @Input('pageIndex') set pageIndexChanged(pageIndex: number) {
    this.pageIndex = pageIndex;
  }

  @Input('length') set lengthChanged(length: number) {
    this.length = length;
    this.updateGoto();
  }
  @Input('pageSize') set pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.updateGoto();
  }

  @Output() listingEvent = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  pageEvent: any;
  columnsKey: any[] = [];
  dataSource = new MatTableDataSource();
  isData: boolean;
  sortedData: any[];
  pageIndex: number;
  length: number;
  currentDataLength: number;
  goTo: number;
  pageNumbers: number[];



  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns.forEach((data) => {
      this.columnsKey.push(data.apiKey);
    });
    this.dataSource.data = this.elementData;
    this.dataSource.sort = this.sort;

    this.listingContainerSubject.subscribe(event => {
      this.dataSource.data = event;
      this.currentDataLength = this.dataSource.data.length;
      this.paginator.length = this.length;
      this.isDataAvailable();
      this.updateGoto();
    });

    this.isDataAvailable();
    this.updateGoto();
  }

  isDataAvailable() {
    if (this.dataSource.data.length === 0) {
      this.isData = false;
    } else {
      this.isData = true;
    }
  }


  private iterator(pageEvt: PageEvent) {
    if (pageEvt.pageIndex * pageEvt.pageSize < this.length) {
      this.listingEvent.next({ event: 'data', pageEvt });
    }
  }
  onDetail(element) {
    console.log(JSON.stringify(element));
  }

  onDetele(element) {
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
        this.listingEvent.next({ event: 'delete', element });
      }
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
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


  updateGoto() {
    this.goTo = (this.pageIndex || 0) + 1;
    this.pageNumbers = [];
    for (let i = 1; i <= this.length / this.pageSize; i++) {
      this.pageNumbers.push(i);
    }
  }

  paginationChange(pageEvt: PageEvent) {
    this.currentDataLength = pageEvt.length;
    this.pageIndex = pageEvt.pageIndex;
    this.pageSize = pageEvt.pageSize;
    this.updateGoto();
    this.emitPageEvent(pageEvt);
    this.iterator(pageEvt);
  }

  goToChange() {
    this.paginator.pageIndex = this.goTo - 1;
    this.iterator({
      length: this.paginator.length,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    });
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  emitPageEvent(pageEvent: PageEvent) {
    // this.page.next(pageEvent);
    // this.listingEvent.next({ event: 'page',  pageEvent});

  }

}

import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

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
