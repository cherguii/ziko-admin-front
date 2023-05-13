import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-delete-command',
  templateUrl: 'dialog-delete-command.html',
})
export class DialogDeleteCommandComponent {

  // Fields.
  articleId: string;
  titre: string;

  constructor(public dialogRef: MatDialogRef<DialogDeleteCommandComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.articleId = data.articleId;
    this.titre = data.titre;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}