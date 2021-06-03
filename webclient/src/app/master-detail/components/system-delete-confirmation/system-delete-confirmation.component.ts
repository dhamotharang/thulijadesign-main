import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-system-delete-confirmation',
  templateUrl: './system-delete-confirmation.component.html',
  styleUrls: ['./system-delete-confirmation.component.css']
})
export class SystemDeleteConfirmationComponent implements OnInit {

  message:string;

  constructor(private dialogRef: MatDialogRef<SystemDeleteConfirmationComponent>) { 
      this.message = "Are you sure you want to delete this item ?"
  }

  ngOnInit() {
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public confirm() {
    this.dialogRef.close(true);
  }

}
