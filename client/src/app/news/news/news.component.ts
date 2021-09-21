import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { NewsService } from "src/app/services/news.service";
import { defaultItem, ServiceStatusCode, TableHeader } from "src/app/shared/constants";
import { News } from "../news.interface";

type ColumnsTable =
  | "index"
  | "title"
  | "description"
  | "content"
  | "author"
  | "archiveDate";
@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"],
})
export class NewsComponent implements OnInit {
  statusService: boolean = false;
  statusServiceCode: any = {};
  newsList: News[] = [];
  dataType: any = {
    archived: true
  }

  headers: TableHeader[] = [
    { tag: 'index', text: '#' },
    { tag: 'title', text: 'Title' },
    { tag: 'description', text: 'Description' },
    { tag: 'content', text: 'Content' },
    { tag: 'author', text: 'Author' },
    { tag: 'archiveDate', text: 'Archive dDate' },
  ];
  news$: Observable<News[]>;
  constructor(private newsApi: NewsService) {
    this.news$ = new BehaviorSubject<News[]>([]);
  }

  async ngOnInit(): Promise<void> {
    /*this.newsList.push(defaultItem);
    this.newsApi
      .updateData(this.newsList)
      .then((res: any) => {
        this.statusService = true;
      })
      .catch((err: HttpErrorResponse) => {
        this.updateStatusServiceCode(err);
      });*/

      this.newsList = await this.newsApi.getData().then((res:any)=> res)
    /*this.newsApi
      .status()
      .then((res: any) => {
        this.updateStatusServiceCode(res);
        this.news$ = res;
      })
      .catch((err: HttpErrorResponse) => {
        this.updateStatusServiceCode(err);
      });*/
  }
  /**
   * Updates status service code
   * @param data
   */
  updateStatusServiceCode(data: any) {
    this.statusService = data.ok;
    this.statusServiceCode = {
      code: data.status,
      value: (ServiceStatusCode as any)[data.status],
    };
  }

  sortTable(field: ColumnsTable) {
    console.log(field);
  }

  switchInfo(){
    console.log(this.dataType['archived'])
    console.log(this.dataType['archived'])
    this.newsApi.getData(this.dataType).then((res: any)=>{
      this.newsList = res
    })
  }

}
