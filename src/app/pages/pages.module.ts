import { NgModule }	from '@angular/core';
import { CommonModule }	from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { GoogleMapsModule } from '@angular/google-maps';

import { NgChartsModule }	from 'ng2-charts';
import { NgxChartsModule }	from '@swimlane/ngx-charts';
import { AmChartsModule }	from '@amcharts/amcharts3-angular';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { UIModule } from '../ui/ui.module';
import { BasePageComponent } from './base-page/base-page.component';

import { PageDashboardComponent }	from './dashboards/dashboard-1/dashboard.component';
import { PageDashboard2Component }	from './dashboards/dashboard-2/dashboard-2.component';
import { PageDashboard3Component }	from './dashboards/dashboard-3/dashboard-3.component';
import { PageDashboard4Component } from './dashboards/dashboard-4/dashboard-4.component';

import { PageNotFoundComponent }	from './not-found/not-found.component';
import { Page404Component }	from './extra-pages/page-404/page-404.component';
import { Page500Component }	from './extra-pages/page-500/page-500.component';
import { environment } from '../../environments/environment';

import { PageArticleListComponent } from './article/article-list/article-list.component';
import { DialogDeleteArticleComponent } from './article/article-list/dialog/dialog-delete-article';
import { PageArticleCreateComponent } from './article/article-create/article-create.component';
import { PageArticleEditComponent } from './article/article-edit/article-edit.component';

import { PageCommandListComponent } from './command/command-list/command-list.component';
import { DialogDeleteCommandComponent } from './command/command-list/dialog/dialog-delete-command';
import { PageCommandEditComponent } from './command/command-edit/command-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    HttpClientJsonpModule,
    UIModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatTreeModule,
    MatBadgeModule,
    MatBottomSheetModule,
    NgChartsModule,
    NgxChartsModule,
    AmChartsModule,
    NgxEchartsModule.forRoot({
      echarts: { init: echarts.init }
    }),
    LeafletModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    GoogleMapsModule
  ],
  declarations: [
    PageDashboardComponent,
    PageDashboard2Component,
    PageDashboard3Component,
    PageDashboard4Component,
    
    Page404Component,
    Page500Component,
    BasePageComponent,
    PageNotFoundComponent,

    PageArticleListComponent,
    PageArticleCreateComponent,
    PageArticleEditComponent,
    DialogDeleteArticleComponent,

    PageCommandListComponent,
    DialogDeleteCommandComponent,
    PageCommandEditComponent,
  ],
  exports: [],
  entryComponents: [
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class PagesModule {}
