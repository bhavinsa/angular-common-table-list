import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const PAGE_OPTIONS: number[] = [50, 100, 200];
const DISPLAYED_COLUMNS = [
  {
    apiKey: 'position',
    displayName: 'Position',
  },
  {
    apiKey: 'name',
    displayName: 'Name',
  },
  {
    apiKey: 'weight',
    displayName: 'Weight',
  },
  {
    apiKey: 'symbol',
    displayName: 'Symbol',
  },
  {
    apiKey: 'action',
    displayName: 'Action',
    links: {
      isEdit: true,
      editUrl: '/about',
      isDelete: true,
      isDetail: false,
    }
  }];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  elementData: PeriodicElement[] = [];
  pageSizeOptions = PAGE_OPTIONS;
  displayedColumns = DISPLAYED_COLUMNS;
  pageSize = 50;
  length = 445;

  constructor() { }

  parentSubject: Subject<any> = new Subject();

  notifyChildren() {
    console.log('called notifyChildren');
    console.log(this.elementData);
    this.parentSubject.next(this.elementData);
  }

  dataEvent(data) {
    console.log('generateData  ' + JSON.stringify(data));
    if (data.event === 'data') {
      this.generateData(data.pageEvt);

    } else if (data.event === 'delete') {
      console.log('called dataEvent - delete!' + JSON.stringify(data.element));
    }
  }


  ngOnInit() {
    setTimeout(() => {
      console.log(`API called`);
      this.elementData = this.generateDataInit(50);
      this.parentSubject.next(this.elementData);
    }, 50);
  }

  generateData(pageEvt) {
    const temp = [];
    const start = pageEvt.pageIndex * pageEvt.pageSize;
    let end = (pageEvt.pageIndex + 1) * pageEvt.pageSize;
    if (end >= pageEvt.length) {
      end = pageEvt.length;
    }
    console.log(`start is -> ${start}`);
    console.log(`end is -> ${end}`);
    for (let i = start + 1; i <= end; i++) {
      const obj = { position: i, name: `Hydrogen`, weight: 1.0079, symbol: 'H' }
      temp.push(obj);
    }
    this.elementData = temp;
    this.notifyChildren();
  }


  generateDataInit(length) {
    console.log(`generateDataInit length ${length}`);
    const temp = [];
    for (let i = 1; i <= length; i++) {
      const obj = { position: i, name: `Hydrogen${i}`, weight: 1.0079, symbol: 'H' }
      temp.push(obj);
    }
    return temp;
  }

  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }

  paginationChange(paginationDetails) {
    console.log('Page Changed: ', paginationDetails);
  }
}
