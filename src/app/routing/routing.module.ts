import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerticalLayoutComponent } from '../layouts/vertical/vertical.component';
import { ExtraLayoutComponent } from '../layouts/extra/extra.component';

import { PageDashboardComponent } from '../pages/dashboards/dashboard-1/dashboard.component';
import { PageDashboard2Component } from '../pages/dashboards/dashboard-2/dashboard-2.component';
import { PageDashboard3Component } from '../pages/dashboards/dashboard-3/dashboard-3.component';
import { PageDashboard4Component } from '../pages/dashboards/dashboard-4/dashboard-4.component';
import { PageNotFoundComponent } from '../pages/not-found/not-found.component';
import { Page404Component } from '../pages/extra-pages/page-404/page-404.component';
import { Page500Component } from '../pages/extra-pages/page-500/page-500.component';

import { PageArticleListComponent } from '../pages/article/article-list/article-list.component';
import { PageArticleCreateComponent } from '../pages/article/article-create/article-create.component';
import { PageArticleEditComponent } from '../pages/article/article-edit/article-edit.component';

import { PageCommandListComponent } from '../pages/command/command-list/command-list.component';
import { PageCommandEditComponent } from '../pages/command/command-edit/command-edit.component';

const mainRoutes: Routes = [
  { path: 'dashboard', component: PageDashboardComponent },
  { path: 'dashboard-2', component: PageDashboard2Component },
  { path: 'dashboard-3', component: PageDashboard3Component },
  { path: 'dashboard-4', component: PageDashboard4Component },
  { path: 'article-list', component: PageArticleListComponent },
  { path: 'article-create', component: PageArticleCreateComponent },
  { path: 'article-edit', component: PageArticleEditComponent },
  { path: 'command-list', component: PageCommandListComponent },
  { path: 'command-edit', component: PageCommandEditComponent },
  { path: '**', component: PageNotFoundComponent },
];

const extraRoutes: Routes = [
  { path: 'page-404', component: Page404Component },
  { path: 'page-500', component: Page500Component },
];

const layoutRoutes: Routes = [
  {
    path: '',
    redirectTo: '/vertical/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'vertical',
    component: VerticalLayoutComponent,
    children: mainRoutes
  },
  {
    path: 'extra',
    component: ExtraLayoutComponent,
    children: extraRoutes
  },
  {
    path: '**',
    component: VerticalLayoutComponent,
    children: mainRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(layoutRoutes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class RoutingModule { }
