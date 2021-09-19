import { Component, OnInit } from '@angular/core';
import { LocalizationService } from './internationalization/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  language: string = 'es-ES';
  title = 'app';

  constructor(private localizationService: LocalizationService) {}
  ngOnInit(): void {
    this.localizationService.initService();
  }

}
