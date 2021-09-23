import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { News } from 'src/app/news/news.interface';
import { TagKeys } from 'src/app/news/shared/constants';
import { SortDirection, TableHeader } from '../constants';

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tableHeaders!: TableHeader[];
  @Input() tableData!: News[];
  @Input() actions?: any;
  @Input() config?: any;
  currentSortValues: { [x: string]: SortDirection } = {};
  @Output() actionEvent = new EventEmitter<any>();

  /**
   * Compare  of table component
   */
  compare = (v1: any, v2: any): any => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
  /**
   * Actions events
   * @param action
   * @param index
   */
  actionEvents(action: string, index: number) {
    switch (action) {
      case TagKeys.archived:
        this.archive(action, this.tableData[index]);
        break;

      default:
        break;
    }
  }
  /**
   * Archives table component
   * @param action
   * @param item
   */
  archive(action: string, item: News) {
    /*item.archived = this.config[action];
    item.archiveDate = new Date();*/
    this.actionEvent.emit({ action, item });
    /*this.tableData = this.tableData.filter(
      (news: any) => news[action] != this.config[action]
    );*/
  }
  /**
   * Orders by
   * @param column
   */
  orderBy(column: string) {
    let item: SortDirection = this.currentSortValues[column];
    if (column in this.currentSortValues) {
      if (item === 'desc') {
        item = 'asc';
      } else item = 'desc';
    } else {
      item = 'asc';
    }
    this.tableData = [...this.tableData].sort((a: any, b: any) => {
      const res = this.compare(a[column], b[column]);
      return item === 'asc' ? res : -res;
    });
  }

}
