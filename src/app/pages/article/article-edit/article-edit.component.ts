import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePageComponent } from '../../base-page/base-page.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces/app-state';
import { ArticleService } from 'src/app/services/article/article.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/core/models/article.model';
import { environment } from 'src/environments/environment';
import { CommonHelper } from 'src/app/core/helpers/commonHelper';

@Component({
  selector: 'page-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class PageArticleEditComponent extends BasePageComponent implements OnInit, OnDestroy {
  
  // Fields.
  form: FormGroup;
  showLoading = false;

  // upload photo.
  fileData_1: File = null;
  fileData_2: File = null;
  fileData_3: File = null;

  previewUrl_1: any = null;
  previewUrl_2: any = null;
  previewUrl_3: any = null;

  backgroundImagePhoto_1 = '';
  backgroundImagePhoto_2 = '';
  backgroundImagePhoto_3 = '';

  backgroundImageSize_1 = '';
  backgroundImageSize_2 = '';
  backgroundImageSize_3 = '';

  fileAsBase64_1: string;
  fileAsBase64_2: string;
  fileAsBase64_3: string;

  constructor(store: Store<AppState>, 
              private formBuilder: FormBuilder,
              private firebaseSv: ArticleService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {
    super(store);

    this.pageData = {
      title: 'Modification d\'un article',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Article Liste',
          route: './article-list'
        },
        {
          title: 'Modification d\'un article'
        }
      ]
    };
  }

  // ngOnInit.
  ngOnInit() {
    super.ngOnInit();
    this.initForm();
    this.initPhotos();
    this.loadArticle();
  }

  // initForm.
  initForm() {
    this.form = this.formBuilder.group({
      Titre: [null, Validators.required],
      PrixInitialeUnitaire: [null, Validators.required],
      PrixInitialeUnitaireTexteLibre: [null, Validators.required],
      QuantiteInitiale: [null, Validators.required],
      QuantiteEnStock: [null, Validators.required],
      Categorie: [null],
      Marque: [null],
      Description: [null],
      PrixPromoUnitaire: [null],
      IsPromo: [null],
      CodePromo: [null],
      IsValid: [null],
      IsActive: [null],
    });
  }

  // initPhotos.
  initPhotos() {
    this.backgroundImagePhoto_1 = 'url(assets/content/no-image.png)';
    this.backgroundImagePhoto_2 = 'url(assets/content/no-image.png)';
    this.backgroundImagePhoto_3 = 'url(assets/content/no-image.png)';
    this.backgroundImageSize_1 = '70%';
    this.backgroundImageSize_2 = '70%';
    this.backgroundImageSize_3 = '70%';
  }

  // loadFourniture.
  loadArticle() {
    const articleId = this.route.snapshot.queryParamMap.get('articleId');
    this.firebaseSv.getArticleById(articleId)
          .subscribe({
              next: (data: any) => {
                if(this.firebaseSv.isGetArticleByIdOK === true) {
                  this.form.patchValue({
                    id: (<Article>data).id,
                    Titre: (<Article>data).Titre,
                    PrixInitialeUnitaire: (<Article>data).PrixInitialeUnitaire,
                    PrixInitialeUnitaireTexteLibre: (<Article>data).PrixInitialeUnitaireTexteLibre,
                    QuantiteInitiale: (<Article>data).QuantiteInitiale,
                    QuantiteEnStock: (<Article>data).QuantiteEnStock,
                    Categorie: (<Article>data).Categorie,
                    Marque: (<Article>data).Marque,
                    Description: (<Article>data).Description,
                    PrixPromoUnitaire: (<Article>data).PrixPromoUnitaire,
                    IsPromo: (<Article>data).IsPromo,
                    CodePromo: (<Article>data).CodePromo,
                    IsValid: (<Article>data).IsValid,
                    IsActive: (<Article>data).IsActive,
                  });

                  let photos = (<Article>data).Photos;

                  var photo_1 = photos.find((element) => element.Order === 1);
                  if (photo_1 === null || photo_1 === undefined || photo_1.IsNoImage === true) {
                    this.backgroundImagePhoto_1 = 'url(assets/content/no-image.png)';
                    this.backgroundImageSize_1 = '70%';
                    this.previewUrl_1 = null;
                    this.fileAsBase64_1 = '';
                  }
                  else {
                    this.backgroundImagePhoto_1 = 'url(' + photo_1.PhotoBase64 + ')';
                    this.backgroundImageSize_1 = 'cover';
                    this.previewUrl_1 = photo_1.PhotoBase64;
                    this.fileAsBase64_1 = photo_1.PhotoBase64;
                  }

                  var photo_2 = photos.find((element) => element.Order === 2);
                  if (photo_2 === null || photo_2 === undefined || photo_2.IsNoImage === true) {
                    this.backgroundImagePhoto_2 = 'url(assets/content/no-image.png)';
                    this.backgroundImageSize_2 = '70%';
                    this.previewUrl_2 = null;
                    this.fileAsBase64_2 = '';
                  }
                  else {
                    this.backgroundImagePhoto_2 = 'url(' + photo_2.PhotoBase64 + ')';
                    this.backgroundImageSize_2 = 'cover';
                    this.previewUrl_2 = photo_2.PhotoBase64;
                    this.fileAsBase64_2 = photo_2.PhotoBase64;
                  }

                  var photo_3 = photos.find((element) => element.Order === 3);
                  if (photo_3 === null || photo_3 === undefined || photo_3.IsNoImage === true) {
                    this.backgroundImagePhoto_3 = 'url(assets/content/no-image.png)';
                    this.backgroundImageSize_3 = '70%';
                    this.previewUrl_3 = null;
                    this.fileAsBase64_3 = '';
                  }
                  else {
                    this.backgroundImagePhoto_3 = 'url(' + photo_3.PhotoBase64 + ')';
                    this.backgroundImageSize_3 = 'cover';
                    this.previewUrl_3 = photo_3.PhotoBase64;
                    this.fileAsBase64_3 = photo_3.PhotoBase64;
                  }
                }
                else {
                  this.showNotification(
                    'snackbar-danger',
                    'Une erreur est survenue lors de la récupération des articles.',
                    'bottom',
                    'right'
                  );  
                }
                
                this.setLoaded(400);
              },
              complete: () => {},
              error: (err) => {
                console.error(err);
              }
            }
          );
  }

  // onSubmitEditArticleForm.
  onSubmitEditArticleForm() {
    this.showLoading = true;
    var articleForm = this.form.value;
    
    var dateCreate = new Date();
    var article = {
      id: this.route.snapshot.queryParamMap.get('articleId'),
      Titre: CommonHelper.capitalizeFirstLetter(articleForm.Titre),
      PrixInitialeUnitaire: articleForm.PrixInitialeUnitaire,
      PrixInitialeUnitaireTexteLibre: articleForm.PrixInitialeUnitaireTexteLibre ,
      PrixPromoUnitaire: "0",
      Photos: this.getPhotos(),
      QuantiteInitiale: articleForm.QuantiteInitiale,
      QuantiteEnStock: articleForm.QuantiteEnStock,
      Categorie: articleForm.Categorie,
      Marque: articleForm.Marque,
      Description: articleForm.Description != undefined ? articleForm.Description.replace(/\n/g, '<br>\n') : '',
      IsPromo: false,
      CodePromo: "RAS",
      IsValid: true,
      IsActive: true,
      Vendeur: this.getVendeur(),
      LastUpdatedDate:  dateCreate,
      LastUpdatedDateString:  CommonHelper.formatDate(dateCreate),
    }
    
    this.firebaseSv.updateArticle(article)
        .then((response) => {
          if(this.firebaseSv.isUpdateArticleOK === true) {
            this.showNotification(
              'snackbar-success',
              'L\'article a bien été enregistrer en base de données.',
              'bottom',
              'right'
            );  
          }
          else {
            this.showNotification(
              'snackbar-danger',
              'Une erreur est survenue lors de la mise à jour de l\'article.',
              'bottom',
              'right'
            );  
          }
          this.showLoading = false;
        })
        .catch(e => {
            console.log(e);
            this.showLoading = false;
        });
  }

  // getvendeur.
  getVendeur() {
    var vendeur = {
      Nom: 'CHERGUI',
      Prenom: 'Akram',
      Email: 'cherguii@yahoo.fr',
      Telephone: '+33 6 58 48 50 12',
      Adresse: 'Alger - Bordj El Kiffan'
    };
    return vendeur;
  }

  // getPhotos.
  getPhotos() {
    var photoCpt = 1;
    var photos = new Array<any>();
    if (this.fileAsBase64_1 !== null && this.fileAsBase64_1 !== undefined && this.fileAsBase64_1 !== '') {
      var photo_1 = {
        Order: photoCpt,
        PhotoBase64: this.fileAsBase64_1,
        IsNoImage: false
      };
      photos.push(photo_1);
      photoCpt++;
    }
    else {
      var photo_1 = {
        Order: photoCpt,
        PhotoBase64: 'assets/content/no-image.png',
        IsNoImage: true
      };
      photos.push(photo_1);
      photoCpt++;
    }
    
    if (this.fileAsBase64_2 !== null && this.fileAsBase64_2 !== undefined && this.fileAsBase64_2 !== '') {
      var photo_2 = {
        Order: photoCpt,
        PhotoBase64: this.fileAsBase64_2,
        IsNoImage: false
      };
      photos.push(photo_2);
      photoCpt++;
    }
    else {
      var photo_2 = {
        Order: photoCpt,
        PhotoBase64: 'assets/content/no-image.png',
        IsNoImage: true
      };
      photos.push(photo_2);
      photoCpt++;
    }

    if (this.fileAsBase64_3 !== null && this.fileAsBase64_3 !== undefined && this.fileAsBase64_3 !== '') {
      var photo_3 = {
        Order: photoCpt,
        PhotoBase64: this.fileAsBase64_3,
        IsNoImage: false
      };
      photos.push(photo_3);
      photoCpt++;
    }
    else {
      var photo_3 = {
        Order: photoCpt,
        PhotoBase64: 'assets/content/no-image.png',
        IsNoImage: true
      };
      photos.push(photo_3);
      photoCpt++;
    }
    return photos;
  }

  // goToArticleOnline.
  goToArticleOnline() {
    const articleId = this.route.snapshot.queryParamMap.get('articleId');
    window.open(`${environment.frontDetailPageUrl}?articleId=${articleId}`, '_blank');
  }

  /******** Photos *********/
  // fileChangeImage_1.
  fileChangeImage_1(fileInput: any) {
    this.fileData_1 = <File>fileInput.target.files[0];
    this.previewFile_1();
  }

  // previewFile_1.
  previewFile_1() {
    var mimeType = this.fileData_1.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData_1);
    reader.onload = (_event) => {
      this.backgroundImagePhoto_1 = 'url(' + reader.result + ')';
      this.backgroundImageSize_1 = 'cover';
      this.previewUrl_1 = reader.result;
      this.fileAsBase64_1 = reader.result.toString();
    }
  }

  // removePhoto_1.
  removePhoto_1() {
    this.backgroundImagePhoto_1 = 'url(assets/content/no-image.png)';
    this.backgroundImageSize_1 = '70%';
    this.previewUrl_1 = null;
    this.fileAsBase64_1 = '';
  }

  // fileChangeImage_2.
  fileChangeImage_2(fileInput: any) {
    this.fileData_2 = <File>fileInput.target.files[0];
    this.previewFile_2();
  }

  // previewFile_2.
  previewFile_2() {
    var mimeType = this.fileData_2.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData_2);
    reader.onload = (_event) => {
      this.backgroundImagePhoto_2 = 'url(' + reader.result + ')';
      this.backgroundImageSize_2 = 'cover';
      this.previewUrl_2 = reader.result;
      this.fileAsBase64_2 = reader.result.toString();
    }
  }

  // removePhoto_2.
  removePhoto_2() {
    this.backgroundImagePhoto_2 = 'url(assets/content/no-image.png)';
    this.backgroundImageSize_2 = '70%';
    this.previewUrl_2 = null;
    this.fileAsBase64_2 = '';
  }

  // fileChangeImage_3.
  fileChangeImage_3(fileInput: any) {
    this.fileData_3 = <File>fileInput.target.files[0];
    this.previewFile_3();
  }

  // previewFile_3.
  previewFile_3() {
    var mimeType = this.fileData_3.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData_3);
    reader.onload = (_event) => {
      this.backgroundImagePhoto_3 = 'url(' + reader.result + ')';
      this.backgroundImageSize_3 = 'cover';
      this.previewUrl_3 = reader.result;
      this.fileAsBase64_3 = reader.result.toString();
    }
  }

  // removePhoto_3.
  removePhoto_3() {
    this.backgroundImagePhoto_3 = 'url(assets/content/no-image.png)';
    this.backgroundImageSize_3 = '70%';
    this.previewUrl_3 = null;
    this.fileAsBase64_3 = '';
  }

  // showNotification.
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
