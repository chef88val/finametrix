import { Component, Input, OnInit } from "@angular/core";
import { News } from "src/app/news/news.interface";
import { TableHeader } from "../constants";

export interface SortEvent {
  column: string;
  direction: SortDirection;
}
export type SortDirection = "asc" | "desc" | "";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  @Input() tableHeaders!: TableHeader[];
  @Input() tableData!: News[];
  currentSortValues: { [x: string]: SortDirection } = {};
  constructor() {}

  ngOnInit(): void {}

  compare = (v1: any, v2: any): any => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

  orderBy(column: string) {
    let item = this.currentSortValues[column];
    if (column in this.currentSortValues) {
      if (this.currentSortValues[column] === "desc") {
        this.currentSortValues[column] = "asc";
      } else this.currentSortValues[column] = "desc";
    } else {
      this.currentSortValues[column] = "asc";
    }
    let direction = this.currentSortValues[column];
    this.tableData = [...this.tableData].sort((a: any, b: any) => {
      const res = this.compare(a[column], b[column]);
      return direction === "asc" ? res : -res;
    });
  }
}
