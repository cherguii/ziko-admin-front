import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Article, ArticleItem } from 'src/app/core/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  // Fields.
  isGetAllArticleOK = false;
  isGetArticleByIdOK = false;
  isAddArticleOK = false;
  isUpdateArticleOK = false;
  isDeleteArticleOK = false;

  // Ctor.
  constructor(private store: AngularFirestore) { }

  // Retourne la liste des articles.
  getAllArticle(): Observable<any> {
    return this.store
        .collection('Article')
        .get()
        .pipe(
          map((response) => {
            this.isGetAllArticleOK = true;
            var articles = new Array<ArticleItem>();

            response.forEach((doc) => {
              var article = doc.data();

              var articleItem = new ArticleItem();
              articleItem.id = doc.id;
              articleItem.Titre = (<any>article).Titre;
              articleItem.Categorie = (<any>article).Categorie;
              articleItem.PrixInitialeUnitaire = (<any>article).PrixInitialeUnitaire;
              articleItem.QuantiteInitiale = (<any>article).QuantiteInitiale;
              articleItem.QuantiteEnStock = (<any>article).QuantiteEnStock;
              articleItem.IsActive = (<any>article).IsActive;
              articleItem.CreatedDateString = (<any>article).CreatedDateString;
              articleItem.Photo = (<any>article).Photos.length > 0 ? (<any>article).Photos.find(x => x.Order === 1).PhotoBase64 : '';

              articles.push(articleItem);
            });

            return articles;
          }),
          catchError((error) => {
            this.isGetAllArticleOK = false;
            var error = error;
            return of(0);
          })
        );
  }

  // Retourne un article en fonction de son Id.
  getArticleById(articleId: string): Observable<any> {
    return this.store
        .collection('Article')
        .doc(articleId)
        .get()
        .pipe(
          map((response) => {
            this.isGetArticleByIdOK = true;
            var article = response.data();
            (<any>article).id = response.id;
            return article;
          }),
          catchError((error) => {
            this.isGetArticleByIdOK = false;
            var error = error;
            return of(0);
          })
        );
  }


  // Ajouter un article en base de données Firebase.
  addArticle(article: any) {
    return this.store.collection('Article').add(article)
            .then((response) => {
                this.isAddArticleOK = true;
                var currentAdded = new Article();
                currentAdded.id = response.id;
                return currentAdded;
            })
            .catch(error => {
                console.log(error);
                this.isAddArticleOK = false;
                return of(0);
            });
  }

  // Mettre à jour un article en base de données Firebase.
  updateArticle(article) {
    return this.store.collection('Article').doc(article.id).update(article)
          .then((response) => {
              this.isUpdateArticleOK = true;
              return response;
          })
          .catch(error => {
            console.log(error);
            this.isUpdateArticleOK = false;
            return of(0);
          });
  }

  // Supprimer un article en base de données Firebase.
  deleteArticle(articleId) {
    return this.store.collection('Article').doc(articleId).delete()
            .then((response) => {
              this.isDeleteArticleOK = true;
          })
          .catch(error => {
            console.log(error);
            this.isDeleteArticleOK = false;
            return of(0);
          });
  }
}
