import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
	imports:[
		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatSelectModule,
		MatSidenavModule,
		MatSnackBarModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		NgxMaterialTimepickerModule,
		EditorModule,
		NgxExtendedPdfViewerModule
    ],
	exports:[
		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatSelectModule,
		MatSidenavModule,
		MatSnackBarModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		NgxMaterialTimepickerModule,
		EditorModule
    ]
})
export class MaterialModule { }