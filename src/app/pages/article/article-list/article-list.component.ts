import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../base-page/base-page.component';
import { AppState } from '../../../interfaces/app-state';
import { ArticleItem } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/services/article/article.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteArticleComponent } from './dialog/dialog-delete-article';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'page-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class PageArticleListComponent extends BasePageComponent implements OnInit, OnDestroy {

  // Fields.
  articlesColumns: string[];
  articles: ArticleItem[];

  displayedColumns = [
    { def: 'id', hide: true },
    { def: 'Photo', hide: false },
    { def: 'Titre', hide: false },
    { def: 'Categorie', hide: false },
    { def: 'PrixInitialeUnitaire', hide: false },
    { def: 'QuantiteInitiale', hide: false },
    { def: 'QuantiteEnStock', hide: false },
    { def: 'IsActive', hide: false },
    { def: 'CreatedDateString', hide: false },
    { def: 'actions', hide: false }
  ];

  // Ctor.
  constructor(store: Store<AppState>, 
              private firebaseSv: ArticleService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private router: Router) {
    super(store);
    this.pageData = {
      title: 'Liste des articles',
      loaded: false,
      breadcrumbs: [
        {
          title: 'Accueil',
          route: './article-list'
        },
        {
          title: 'Articles'
        }
      ]
    };
    
    this.articles = [];
  }

  // ngOnInit.
  ngOnInit() {
    super.ngOnInit();
    this.loadArticles();
  }
  
  // Charger tout les articles.
  loadArticles() {
    this.firebaseSv.getAllArticle()
    .subscribe(
      {
        next: (data: any) => {
          this.articles = data;
          this.setLoaded(400);
        },
        complete: () => {},
        error: (err) => {
          this.articles = [];
          console.error(err);
        }
      }
    );
  }

  // goToEditArticle.
  goToEditArticle(articleId: string): void {
    this.router.navigate(['/vertical/article-edit'], { queryParams: { articleId: articleId } });
  }

  // goToArticleOnline.
  goToArticleOnline(articleId: string) {
    window.open(`${environment.frontDetailPageUrl}?articleId=${articleId}`, '_blank');
  }

  // openDialog.
  openDialog(articleId, titre): void {
    const dialogRef = this.dialog.open(DialogDeleteArticleComponent, {
      width: '300px',
      data: { 
        articleId: articleId,
        titre: titre
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.deleteArticle(articleId);
      }
    });
  }

  // deleteArticle.
  deleteArticle(articleId) {
    this.firebaseSv.deleteArticle(articleId)
        .then((response) => {
          this.loadArticles();
          this.showNotification(
            'snackbar-success',
            'L\'article a bien été supprimer de la base de données.',
            'bottom',
            'right'
          );  
      })
      .catch(e => {
          console.log(e);
      });
  }

  // getDisplayedColumns.
  getDisplayedColumns(): string[] {
    return this.displayedColumns
      .filter(cd => !cd.hide)
      .map(cd => cd.def);
  }

  // showNotification.
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 7500,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
