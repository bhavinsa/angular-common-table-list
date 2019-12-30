import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
 
];

const ELEMENT_DATA2: PeriodicElement[] = [
  
];

const PAGE_OPTIONS: number[] = [2, 4, 6, 10, 20];
// const DISPLAYED_COLUMNS: string[] = ['position', 'name', 'weight', 'symbol'];
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
  }];

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  elementData = [];
  pageSizeOptions = PAGE_OPTIONS;
  displayedColumns = DISPLAYED_COLUMNS;

  public pageSize = 2;
  public currentPage = 0;
  public totalSize = 0;

  constructor() { }

  parentSubject: Subject<any> = new Subject();

  notifyChildren() {
    console.log('called notifyChildren');
    console.log(JSON.stringify(this.elementData));
    this.parentSubject.next(this.elementData);
  }

  dataEvent(event) {
    console.log('called dataEvent');
    this.elementData = [...ELEMENT_DATA, ...ELEMENT_DATA2];
    this.notifyChildren();
  }


  ngOnInit() {
    setTimeout(() => {
      console.log('API called');
      this.elementData = ELEMENT_DATA;
      this.parentSubject.next(this.elementData);
    }, 3000);
  }

  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }
}
