import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    // MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    // MatNativeDateModule,
  ],
})
export class MatComponentsModule {}
