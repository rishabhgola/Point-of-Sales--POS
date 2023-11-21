import { Component } from '@angular/core';
import { AppCommonService } from './Service/app-common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'POS';

  constructor(public appCommonService: AppCommonService) {}
}
