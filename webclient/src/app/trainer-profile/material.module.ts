import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
	imports:[
		MatToolbarModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		MatCardModule,
		MatIconModule,
		MatTableModule,
		MatDialogModule,
		MatTabsModule,
		MatSelectModule,
		MatListModule,
		MatMenuModule,
		MatSidenavModule,
		MatDatepickerModule,
		NgxMaterialTimepickerModule,
		MatNativeDateModule,
		EditorModule
    ],
    exports:[
		MatToolbarModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		MatCardModule,
		MatIconModule,
		MatTableModule,
		MatDialogModule,
		MatTabsModule,
		MatSelectModule,
		MatListModule,
		MatMenuModule,
		MatSidenavModule,
		MatDatepickerModule,
		NgxMaterialTimepickerModule,
		MatNativeDateModule,
		EditorModule
    ]
})
export class MaterialModule { }