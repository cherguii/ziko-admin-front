import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePageComponent } from '../../base-page/base-page.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces/app-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonHelper } from 'src/app/core/helpers/commonHelper';
import { CommandService } from 'src/app/services/command/command.service';
import { CommandModel } from 'src/app/core/models/command.model';
import { TransactionStatusCodeConstante, TransactionStatusLibelleConstante } from 'src/app/core/helpers/globalConstants';
import { formatDate } from '@angular/common';

@Component({
  selector: 'page-command-edit',
  templateUrl: './command-edit.component.html',
  styleUrls: ['./command-edit.component.scss']
})
export class PageCommandEditComponent extends BasePageComponent implements OnInit, OnDestroy {
  
  // Fields.
  form: FormGroup;
  showLoading = false;

  NumeroCommand: string;
  NomPrenomAcheteur: string;
  TelephoneAcheteur: string;
  //EmailAcheteur: string;
  WilayaAcheteur: string;
  CommuneAdresseAcheteur: string;
  TransactionStatus: string;
  ArticlePhotoBase64: string;
  Quantite: string;
  ArticleId: string;
  ArticlePrixUnitaire: string;
  PrixTotal: string;
  CreatedDateString: string;
  LastUpdatedDateString: string;

  CommandStatus = [
    {
      Code: TransactionStatusCodeConstante.CreatationCode,
      Libelle: TransactionStatusLibelleConstante.CreatationLibelle
    },
    {
      Code: TransactionStatusCodeConstante.PrisEnChargeParTransporteurCode,
      Libelle: TransactionStatusLibelleConstante.PrisEnChargeParTransporteurLibelle
    },
    {
      Code: TransactionStatusCodeConstante.RecusEtPayerParClientCode,
      Libelle: TransactionStatusLibelleConstante.RecusEtPayerParClientLibelle
    },
    {
      Code: TransactionStatusCodeConstante.RecusEtRetournerParClientCode,
      Libelle: TransactionStatusLibelleConstante.RecusEtRetournerParClientLibelle
    },
    {
      Code: TransactionStatusCodeConstante.NonRecusParClientCode,
      Libelle: TransactionStatusLibelleConstante.NonRecusParClientLibelle
    },
  ]

  constructor(store: Store<AppState>, 
              private formBuilder: FormBuilder,
              private firebaseSv: CommandService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {
    super(store);

    this.pageData = {
      title: 'Modification d\'une commande',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Commandes Liste',
          route: './command-list'
        },
        {
          title: 'Modification d\'une commande'
        }
      ]
    };
  }

  // ngOnInit.
  ngOnInit() {
    super.ngOnInit();
    this.initForm();
    this.loadCommand();
  }

  // initForm.
  initForm() {
    this.form = this.formBuilder.group({
      NumeroReferenceTransporteur: [null],
      TransporteurPrix: [null],
      TransactionStatusCode: [null],
      PriseEnChargeParTransporteurDate: [null],
      ReceptionClientDate: [null],
      RetourClientDate: [null],
    });
  }

  // loadCommand.
  loadCommand() {
    const commandId = this.route.snapshot.queryParamMap.get('commandId');
    this.firebaseSv.getCommandById(commandId)
          .subscribe({
              next: (data: any) => {
                if(this.firebaseSv.isGetCommandByIdOK === true) {

                  var priseEnChargeParTransporteurDate = <any>(<CommandModel>data).PriseEnChargeParTransporteurDate;
                  var receptionClientDate = <any>(<CommandModel>data).ReceptionClientDate;
                  var retourClientDate = <any>(<CommandModel>data).RetourClientDate;

                  this.form.patchValue({
                    id: (<CommandModel>data).id,
                    NumeroReferenceTransporteur: (<CommandModel>data).NumeroReferenceTransporteur,
                    TransporteurPrix: (<CommandModel>data).TransporteurPrix,
                    TransactionStatusCode: (<CommandModel>data).TransactionStatus.Code,
                    PriseEnChargeParTransporteurDate: priseEnChargeParTransporteurDate !== null ? priseEnChargeParTransporteurDate.toDate() : null,
                    PriseEnChargeParTransporteurDateString: (<CommandModel>data).PriseEnChargeParTransporteurDateString,
                    ReceptionClientDate: receptionClientDate !== null ? receptionClientDate.toDate() : null,
                    ReceptionClientDateString: (<CommandModel>data).ReceptionClientDateString,
                    RetourClientDate: retourClientDate !== null ? retourClientDate.toDate(): null,
                    RetourClientDateString: (<CommandModel>data).RetourClientDateString,
                  });

                  
                  
                  this.ArticlePhotoBase64 = (<CommandModel>data).Article.PhotoArticle;
                  this.NumeroCommand = (<CommandModel>data).NumeroCommand;
                  this.NomPrenomAcheteur = (<CommandModel>data).Acheteur.NomPrenom;
                  this.TelephoneAcheteur = (<CommandModel>data).Acheteur.Telephone;
                  //this.EmailAcheteur = (<CommandModel>data).Acheteur.Email;
                  this.WilayaAcheteur = (<CommandModel>data).Acheteur.Wilaya;
                  this.CommuneAdresseAcheteur = (<CommandModel>data).Acheteur.CommuneAdresse;
                  this.TransactionStatus = (<CommandModel>data).TransactionStatus.Libelle;                  
                  this.ArticleId = (<CommandModel>data).Article.ArticleId;
                  this.ArticlePrixUnitaire = (<CommandModel>data).Article.PrixInitialeUnitaire;
                  this.Quantite = (<CommandModel>data).Quantite.toString();
                  this.PrixTotal = `${Number(this.ArticlePrixUnitaire) * Number(this.Quantite)} DA`;
                  this.CreatedDateString = (<CommandModel>data).CreatedDateString;
                  this.LastUpdatedDateString = (<CommandModel>data).LastUpdatedDateString;
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

  // onSubmitEditCommandForm.
  onSubmitEditCommandForm() {
    this.showLoading = true;
    var commandForm = this.form.value;

    var dateUpdate = new Date();
    var command = {
      id: this.route.snapshot.queryParamMap.get('commandId'),
      NumeroReferenceTransporteur: commandForm.NumeroReferenceTransporteur,
      TransporteurPrix: commandForm.TransporteurPrix,
      TransactionStatus: {
        Code: commandForm.TransactionStatusCode !== undefined ? commandForm.TransactionStatusCode : TransactionStatusCodeConstante.CreatationCode,
        Libelle: commandForm.TransactionStatusCode !== undefined ? this.getLibelleStatusByCode(commandForm.TransactionStatusCode) : this.getLibelleStatusByCode(TransactionStatusCodeConstante.CreatationCode)
      },
      PriseEnChargeParTransporteurDate: commandForm.PriseEnChargeParTransporteurDate !== undefined ? commandForm.PriseEnChargeParTransporteurDate : null,
      PriseEnChargeParTransporteurDateString: commandForm.PriseEnChargeParTransporteurDate ? CommonHelper.formatDate(commandForm.PriseEnChargeParTransporteurDate): '',
      ReceptionClientDate: commandForm.ReceptionClientDate !== undefined ? commandForm.ReceptionClientDate : null,
      ReceptionClientDateString: commandForm.ReceptionClientDate ? CommonHelper.formatDate(commandForm.ReceptionClientDate) : '',
      RetourClientDate: commandForm.RetourClientDate !== undefined ? commandForm.RetourClientDate : null,
      RetourClientDateString: commandForm.RetourClientDate ? CommonHelper.formatDate(commandForm.RetourClientDate) : '',
      LastUpdatedDate:  dateUpdate,
      LastUpdatedDateString:  CommonHelper.formatDate(dateUpdate)      
    }
    
    this.firebaseSv.updateCommand(command)
        .then((response) => {
          if(this.firebaseSv.isUpdateCommandOK === true) {
            this.showNotification(
              'snackbar-success',
              'La commande a bien été enregistrer en base de données.',
              'bottom',
              'right'
            );  
          }
          else {
            this.showNotification(
              'snackbar-danger',
              'Une erreur est survenue lors de la mise à jour de la commande.',
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

  // getLibelleStatusByCode.
  getLibelleStatusByCode(statusCode) {
    switch (statusCode) {
      case TransactionStatusCodeConstante.CreatationCode:
        return TransactionStatusLibelleConstante.CreatationLibelle;
      case TransactionStatusCodeConstante.PrisEnChargeParTransporteurCode:
        return TransactionStatusLibelleConstante.PrisEnChargeParTransporteurLibelle;
      case TransactionStatusCodeConstante.RecusEtPayerParClientCode:
        return TransactionStatusLibelleConstante.RecusEtPayerParClientLibelle;
      case TransactionStatusCodeConstante.RecusEtRetournerParClientCode:
        return TransactionStatusLibelleConstante.RecusEtRetournerParClientLibelle;
      case TransactionStatusCodeConstante.NonRecusParClientCode:
        return TransactionStatusLibelleConstante.NonRecusParClientLibelle;
    }
  }

  // // getvendeur.
  // getVendeur() {
  //   var vendeur = {
  //     Nom: 'CHERGUI',
  //     Prenom: 'Akram',
  //     Email: 'cherguii@yahoo.fr',
  //     Telephone: '+33 6 58 48 50 12',
  //     Adresse: 'Alger - Bordj El Kiffan'
  //   };
  //   return vendeur;
  // }

  // goToArticleOnline.
  goToArticleOnline(articleId) {
    //const articleId = this.route.snapshot.queryParamMap.get('articleId');
    window.open(`${environment.frontDetailPageUrl}?articleId=${articleId}`, '_blank');
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
