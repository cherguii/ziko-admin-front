import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../base-page/base-page.component';
import { AppState } from '../../../interfaces/app-state';
import { CommandService } from 'src/app/services/command/command.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteCommandComponent } from './dialog/dialog-delete-command';
import { CommandItem } from 'src/app/core/models/command.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'page-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss']
})
export class PageCommandListComponent extends BasePageComponent implements OnInit, OnDestroy {

  // Fields.
  commandsColumns: string[];
  commands: CommandItem[];

  displayedColumns = [
    { def: 'id', hide: true },
    { def: 'PhotoArticle', hide: false },
    { def: 'NumeroCommand', hide: false },
    { def: 'TitreArticle', hide: false },
    { def: 'Quantite', hide: false },
    { def: 'NomPrenomAcheteur', hide: false },
    { def: 'TelephoneAcheteur', hide: false },
    { def: 'WilayaAcheteur', hide: false },
    { def: 'CreatedDateString', hide: false },
    { def: 'actions', hide: false }
  ];

  // Ctor.
  constructor(store: Store<AppState>, 
              private firebaseSv: CommandService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private router: Router) {
    super(store);
    this.pageData = {
      title: 'Liste des commandes',
      loaded: false,
      breadcrumbs: [
        {
          title: 'Accueil',
          route: './command-list'
        },
        {
          title: 'Commandes'
        }
      ]
    };
    
    this.commands = [];
  }

  // ngOnInit.
  ngOnInit() {
    super.ngOnInit();
    this.loadCommands();
  }
  
  // Charger tout les commandes.
  loadCommands() {
    this.firebaseSv.getAllCommand()
    .subscribe(
      {
        next: (data: any) => {
          this.commands = data;
          this.setLoaded(400);
        },
        complete: () => {},
        error: (err) => {
          this.commands = [];
          console.error(err);
        }
      }
    );
  }

  // goToEditCommand.
  goToEditCommand(commandId: string): void {
    this.router.navigate(['/vertical/command-edit'], { queryParams: { commandId: commandId } });
  }

  // // goToArticleOnline.
  // goToArticleOnline(articleId: string) {
  //   window.open(`${environment.frontDetailPageUrl}?articleId=${articleId}`, '_blank');
  // }

  // openDialog.
  openDialog(commandId, titre): void {
    const dialogRef = this.dialog.open(DialogDeleteCommandComponent, {
      width: '300px',
      data: { 
        commandId: commandId,
        titre: titre
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.deleteCommand(commandId);
      }
    });
  }

  // deleteCommand.
  deleteCommand(commandId) {
    this.firebaseSv.deleteCommand(commandId)
        .then((response) => {
          this.loadCommands();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    //this.commands = this.commands.filter(cmd => cmd.NumeroCommand = filterValue);
    //this.commands = filterValue.trim().toLowerCase();
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
