import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

const ELEMENT_DATA2: PeriodicElement[] = [
  { position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 12, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 15, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
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
  },
  {
    apiKey : 'action',
    displayName : 'Action',
    links : {
      isEdit : true,
      editUrl : '/about',
      isDelete : true,
      isDetail : false,
    }
  }];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
