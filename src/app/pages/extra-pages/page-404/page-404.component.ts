import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../base-page/base-page.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces/app-state';

@Component({
  selector: 'page-404',
  templateUrl: './page-404.component.html',
  styleUrls: ['./page-404.component.scss']
})
export class Page404Component extends BasePageComponent implements OnInit, OnDestroy {
  constructor(store: Store<AppState>) {
    super(store);

    this.pageData = {
      title: '',
      loaded: true,
      breadcrumbs: []
    };
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
