import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TableComponent } from './table/table.component';
import { InternationalizationModule } from '../internationalization/internationalization.module';
import { ScrollTrackerDirective } from './scroll.directive';

@NgModule({
  declarations: [ScrollTrackerDirective, TableComponent],
  imports: [CommonModule, InternationalizationModule, SharedRoutingModule],
  exports: [ScrollTrackerDirective, TableComponent],
})
export class SharedModule {}
