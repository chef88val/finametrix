import * as moment from "moment";
import { News } from "../news/news.interface";

interface ServiceCode {
  [x: number]: string;
}

export const ServiceStatusCode: ServiceCode = {
  200: " Servicio disponible",
  404: " Servicio no disponible",
};


export const URL: string = 'http://localhost:3000/api/';


export interface TableHeaders {
index: string;
title: string;
description: string;
content: string;
author: string;
archiveDate: string;
}
export interface TableHeader {
  tag: keyof TableHeaders;
  text: string;
}
export interface ApiService {
    API_URL: string;
    status(): Promise<boolean>;
    getData(): Promise<News>;
    updateData(data: News[]): Promise<any>;
    handleURL(...param: string[]): string;
}

export const defaultItem:News = {
  title: 'title',
  description: 'description',
  date: new Date(),
  content: '<h1>HOLA MUNDO</h1>',
  author: 'system',
  archiveDate: new Date(),
  archived: false,
  removed: false
}