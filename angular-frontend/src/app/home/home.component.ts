import {Component, Inject, isDevMode} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard, MatCardActions, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

export interface Person {
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatToolbar,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatCardTitle
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  people: Person[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getPeople();
  }



  createPerson(name: string) {
    this.http.post<Person>(environment.apiUrl, {
      name: name
    }).subscribe((person) => {
      this.people.push(person);
    });
  }

  getPeople() {
    this.http.get<Person[]>(environment.apiUrl).subscribe({
      next: (data) => this.people = data,
      error: (err) => console.error('There was an error: ', err)
    });
  }

  deletePerson(id: string): void {
    this.http.delete(environment.apiUrl+ '/' + id, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.people = this.people.filter((person) => person.id !== id);
        },
        error: (error) => {
          console.error('There was an error: ', error);
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCreatePerson, {
      data: "",
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.createPerson(result);
    });
  }

}


@Component({
  selector: 'dialog-create-person',
  templateUrl: 'dialog-create-person.html',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatInput,
    MatDialogClose,
    MatLabel,
    FormsModule
  ],
})
export class DialogCreatePerson {
  constructor(
    public dialogRef: MatDialogRef<DialogCreatePerson>,
    @Inject(MAT_DIALOG_DATA) public data: String,
  ) {}
}
