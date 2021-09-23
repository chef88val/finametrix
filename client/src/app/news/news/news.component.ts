import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import { getRandomElement, ServiceStatusCode } from 'src/app/shared/constants';
import * as _ from 'lodash';

import { News } from '../news.interface';
import {
  actionsCell,
  dataType,
  headers,
  tableConfig,
  TagKeys,
} from '../shared/constants';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  statusService: boolean = false;
  statusServiceCode: any = {};
  newsList: News[] = [];
  news$: Observable<News[]>;
  showLoadData: boolean = false;
  tableConfig = tableConfig;
  dataType = dataType;
  headers = headers;
  actionsCell = actionsCell;

  constructor(private newsApi: NewsService) {
    this.news$ = new BehaviorSubject<News[]>([]);
  }
  /**
   * Updates headers visible
   */
  updateHeadersVisible() {
    Object.keys(this.tableConfig).forEach((key: any) => {
      this.headers.filter((item) => item.tag === key)[0].visible =
        this.tableConfig[key];
    });
  }

  /**
   * Updates headers visible
   */
  filterData(): News[] {
    let dataFiltered: News[] = [];
    Object.keys(this.tableConfig).forEach((key: any) => {
      dataFiltered = this.newsList.filter(
        (item: any) => item[key] === this.tableConfig[key]
      );
    });
    return dataFiltered;
  }

  async ngOnInit(): Promise<void> {
    this.newsList = await this.newsApi
      .getData(this.dataType)
      .then((res: any) => res);
    this.dataType[TagKeys.archived] = true;
    this.updateHeadersVisible();
    this.showLoadData = this.newsList.length < 1;
  }
  /**
   * Generates random data
   */
  async generateRandomData() {
    let data: News[] = [];
    _.times(10, (index: number) => {
      data.push({
        title: `Noticia ${index}`,
        description: `Description ${index}`,
        date: new Date(),
        content: `${getRandomElement()}`,
        author: `system ${index}`,
        archiveDate: new Date(),
        archived: false,
        removed: false,
      });
    });
    this.newsApi
      .updateData(data)
      .then((res:any) => {
        if (res === 200) {
          this.showLoadData = data.length < 1;
        }
      })
      .finally(() => {
        this.newsList = [...this.newsList, ...data];
      });
  }
  /**
   * Updates status service code
   * @param data
   */
  handleErrorResponse(data: HttpErrorResponse) {
    this.statusService = data.ok;
    this.statusServiceCode = {
      code: data.status,
      value: (ServiceStatusCode as any)[data.status],
    };
  }

  /**
   * Switchs info
   */
  switchInfo() {
    this.tableConfig[TagKeys.archived] = this.dataType[TagKeys.archived];
    this.updateHeadersVisible();
    this.newsApi.getData(this.dataType).then((res: any) => {
      this.newsList = res;
    });
  }

  /**
   * Handles action event
   * @param event
   */
  handleActionEvent(event: any) {
    if (event.action === TagKeys.load) {
      if (!(event.action in this.tableConfig)) {
        this.tableConfig[event.action] = true;
        alert('Loading');
      } else {
        let timeout: any = 0;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          delete this.tableConfig[event.action];
        }, 10);
      }
      return;
    }
    const data: News[] = [event[TagKeys.item]];
    event.item[event.action] = !this.tableConfig[event.action];
    data.push();
    this.newsApi
      .updateData([event[TagKeys.item]])
      .then((res:any) => (this.newsList = this.filterData()))
      .catch(this.handleErrorResponse);
  }
}
