import { NgModule } from '@angular/core';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [],
    imports: [],
    exports: [
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatToolbarModule,
      MatTabsModule,
      MatTableModule,
      MatListModule,
      MatSelectModule,
      MatDialogModule
    ]
  })
  export class MaterialModule { }