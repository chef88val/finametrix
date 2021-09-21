import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { News } from "../news/news.interface";
import { ApiService, URL } from "../shared/constants";

@Injectable({
  providedIn: "root",
})
export class NewsService implements ApiService {
  API_URL: string = URL;

  constructor(private http: HttpClient) {}
  /**
   * Status news service
   * @returns status
   */
  status(): Promise<boolean> {
    return this.http.get<boolean>(this.handleURL("status")).toPromise();
  }
  /**
   * Gets data
   * @returns data
   */
  getData(psarams: any = {}): Promise<News> {
    const params = new HttpParams().appendAll(psarams);
    return this.http.get<News>(this.handleURL("news"), {params}).toPromise();
  }
  /**
   * Updates data
   * @param data
   * @returns data
   */
  updateData(data: News[]): Promise<any> {
    if (data.length > 0)
      return this.http.post<News>(this.handleURL("news"), data).toPromise();
    else return this.http.put<News>(this.handleURL("news"), data).toPromise();
  }
  /**
   * Handles url
   * @param param
   * @returns url
   */
  handleURL(...param: string[]): string {
    return this.API_URL.concat(param?.join("/"));
  }
}
