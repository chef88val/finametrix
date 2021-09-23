import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TableComponent } from './table/table.component';
import { InternationalizationModule } from '../internationalization/internationalization.module';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    InternationalizationModule,
    SharedRoutingModule
  ],
  exports: [TableComponent]
})
export class SharedModule { }
