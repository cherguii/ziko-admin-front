import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePageComponent } from '../../base-page/base-page.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces/app-state';
import { ArticleService } from 'src/app/services/article/article.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonHelper } from 'src/app/core/helpers/commonHelper';

@Component({
  selector: 'page-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class PageArticleCreateComponent extends BasePageComponent implements OnInit, OnDestroy {
  
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

  // Ctor.
  constructor(store: Store<AppState>, 
              private formBuilder: FormBuilder,
              private firebaseSv: ArticleService,
              private snackBar: MatSnackBar,
              private router: Router) {
    super(store);

    this.pageData = {
      title: 'Création d\'un article',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Article Liste',
          route: './article-list'
        },
        {
          title: 'Création d\'un article'
        }
      ]
    };
  }

  // ngOnInit.
  ngOnInit() {
    super.ngOnInit();
    this.initForm();
    this.initPhotos();
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
      Description: [null]
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

  // onSubmitAddArticleForm.
  onSubmitAddArticleForm() {
    this.showLoading = true;
    var articleForm = this.form.value;

    var dateCreate = new Date();
    var article = {
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
      CreatedDate:  dateCreate,
      CreatedDateString:  CommonHelper.formatDate(dateCreate),
      LastUpdatedDate:  dateCreate,
      LastUpdatedDateString:  CommonHelper.formatDate(dateCreate),
    }
    
    this.firebaseSv.addArticle(article)
        .then((response) => {
          if (this.firebaseSv.isAddArticleOK === true) {
            this.goToEditArticle((<any>response).id);
          }
          else {
            this.showNotification(
              'snackbar-danger',
              'Une erreur est survenue lors de la création de l\'article.',
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
      Email: 'ziko.admin@gmail.fr',
      Telephone: '06.58.48.50.12',
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

  // goToEditArticle.
  goToEditArticle(articleId: any): void {
    this.router.navigate(['/vertical/article-edit'], { queryParams: { articleId: articleId } });
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
