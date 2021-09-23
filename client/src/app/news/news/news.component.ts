import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { NewsService } from "src/app/services/news.service";
import { ServiceStatusCode } from "src/app/shared/constants";

import { News } from "../news.interface";
import {
  actionsCell,
  dataType,
  headers,
  tableConfig,
  TagKeys,
} from "../shared/constants";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit {
  statusService: boolean = false;
  statusServiceCode: any = {};
  newsList: News[] = [];
  news$: Observable<News[]>;

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
      this.headers.filter((item) => item.tag == key)[0].visible =
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
        (item: any) => item[key] == this.tableConfig[key]
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
    const data: News[] = [event[TagKeys.item]];
    event.item[event.action] = !this.tableConfig[event.action];
    data.push();
    this.newsApi
      .updateData([event[TagKeys.item]])
      .then((res) => (this.newsList = this.filterData()))
      .catch(this.handleErrorResponse);
  }
}
