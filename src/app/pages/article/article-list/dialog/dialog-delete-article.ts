import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog-delete-article',
  templateUrl: 'dialog-delete-article.html',
})
export class DialogDeleteArticleComponent {

  // Fields.
  articleId: string;
  titre: string;

  constructor(public dialogRef: MatDialogRef<DialogDeleteArticleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.articleId = data.articleId;
    this.titre = data.titre;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}