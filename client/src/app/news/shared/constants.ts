import { TableHeader } from "src/app/shared/constants";

export type ColumnsTable =
  | "index"
  | "title"
  | "description"
  | "content"
  | "author"
  | "archived";
/* 
export const archivedCol: TableHeader = {
  tag: "archived",
  text: "Archived Date",

}; */

export const headers: TableHeader[] = [
  { tag: "index", text: "#", visible: true },
  { tag: "title", text: "Title", visible: true },
  { tag: "description", text: "Description", visible: true },
  { tag: "content", text: "Content", visible: true },
  { tag: "author", text: "Author", visible: true },
  { tag: "archived", text: "Archived Date", visible: true },
  { tag: "actions", text: "Actions" , visible: true},
];

export const dataType: any = {
  archived: false,
};

export const tableConfig: { [x: string]: any } = {
  archived: dataType.archived,
};

export const actionsCell = {
  archived: true,
};


export enum TagKeys { item="item" , archived="archived", news="news", status="status"}
