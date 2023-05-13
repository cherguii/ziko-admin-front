import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonHelper } from 'src/app/core/helpers/commonHelper';
import { CommandItem } from 'src/app/core/models/command.model';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  // Fields.
  isGetAllCommandOK = false;
  isGetCommandByIdOK = false;
  isUpdateCommandOK = false;
  isDeleteCommandOK = false;

  // Ctor.
  constructor(private store: AngularFirestore) { }

  // Retourne la liste des commandes.
  getAllCommand(): Observable<any> {
    return this.store
        .collection('Command')
        .get()
        .pipe(
          map((response) => {
            this.isGetAllCommandOK = true;
            var commands = new Array<CommandItem>();

            response.forEach((doc) => {
              var command = doc.data();

              var commandItem = new CommandItem();
              commandItem.id = doc.id;
              commandItem.NumeroCommand = (<any>command).NumeroCommand;
              commandItem.ArticleId = (<any>command).Article.ArticleId;
              commandItem.TitreArticle = (<any>command).Article.TitreArticle;
              commandItem.PhotoArticle = (<any>command).Article.PhotoArticle;
              commandItem.NomPrenomAcheteur = (<any>command).Acheteur.NomPrenom;
              commandItem.TelephoneAcheteur = (<any>command).Acheteur.Telephone;
              commandItem.WilayaAcheteur = (<any>command).Acheteur.Wilaya;
              commandItem.Quantite = (<any>command).Quantite;
              commandItem.CreatedDate = (<any>command).CreatedDate.toDate();
              commandItem.CreatedDateString = (<any>command).CreatedDateString;

              commands.push(commandItem);
            });

            commands = commands.sort((a: CommandItem, b: CommandItem) => {
              return CommonHelper.getTime(b.CreatedDate) - CommonHelper.getTime(a.CreatedDate);
            });

            return commands;
          }),
          catchError((error) => {
            this.isGetAllCommandOK = false;
            var error = error;
            return of(0);
          })
        );
  }

  // Retourne une commande en fonction de son Id.
  getCommandById(commandId: string): Observable<any> {
    return this.store
        .collection('Command')
        .doc(commandId)
        .get()
        .pipe(
          map((response) => {
            this.isGetCommandByIdOK = true;
            var command = response.data();
            (<any>command).id = response.id;
            return command;
          }),
          catchError((error) => {
            this.isGetCommandByIdOK = false;
            var error = error;
            return of(0);
          })
        );
  }

  // Mettre à jour une commande en base de données Firebase.
  updateCommand(command) {
    return this.store.collection('Command').doc(command.id).update(command)
          .then((response) => {
              this.isUpdateCommandOK = true;
              return response;
          })
          .catch(error => {
            console.log(error);
            this.isUpdateCommandOK = false;
            return of(0);
          });
  }

  // Supprimer une commande en base de données Firebase.
  deleteCommand(commandId) {
    return this.store.collection('Command').doc(commandId).delete()
            .then((response) => {
              this.isDeleteCommandOK = true;
          })
          .catch(error => {
            console.log(error);
            this.isDeleteCommandOK = false;
            return of(0);
          });
  }
}
