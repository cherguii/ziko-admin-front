import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { StoreModule } from '@ngrx/store';
import { pageDataReducer } from './store/reducers/page-data.reducer';
import { appSettingsReducer } from './store/reducers/app-settings.reducer';

@NgModule({
  declarations : [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      pageData: pageDataReducer,
      appSettings: appSettingsReducer
    }),
    RoutingModule,
    LayoutsModule,
    PagesModule
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
