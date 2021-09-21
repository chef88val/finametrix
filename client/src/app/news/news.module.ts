import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news/news.component';
import { NewsService } from '../services/news.service';
import { TableComponent } from '../shared/table/table.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    NewsRoutingModule
  ],
  exports:[NewsComponent],
  providers: [NewsService]
})
export class NewsModule { }
