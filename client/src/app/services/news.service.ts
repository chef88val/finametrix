import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../news/news.interface';
import { TagKeys } from '../news/shared/constants';
import { ApiService, URL } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class NewsService implements ApiService {
  API_URL: string = URL;

  constructor(private http: HttpClient) {}
  /**
   * Status news service
   * @returns status
   */
  status(): Promise<boolean> {
    return this.http.get<boolean>(this.handleURL(TagKeys.status)).toPromise();
  }
  /**
   * Gets data
   * @returns data
   */
  getData(_params: any = {}): Promise<News> {
    const params = new HttpParams().appendAll(_params);
    return this.http
      .get<News>(this.handleURL(TagKeys.news), { params })
      .toPromise();
  }
  /**
   * Updates data
   * @param data
   * @returns data
   */
  updateData(data: News[]): Promise<any> {
    if (data.length > 1)
      return this.http
        .post<News>(this.handleURL(TagKeys.news), data)
        .toPromise();
    else
      return this.http
        .put<News>(this.handleURL(TagKeys.news, data[0]._id), data)
        .toPromise();
  }
  /**
   * Handles url to concat multiple parameters
   * @param param
   * @returns url
   */
  handleURL(...param: any[]): string {
    return this.API_URL.concat(param?.join('/'));
  }
}
