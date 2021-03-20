import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CoreModule } from '../../../core/core.module';

import AnalyzerComponent from './analyzer.component';
import { ROUTES } from './analyzer.routes';

@NgModule({
    declarations: [
        AnalyzerComponent
    ],
    imports: [
        CoreModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,

        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatTableModule,
        MatTooltipModule
    ],
    bootstrap: [AnalyzerComponent]
})
export class AnalyzerModule {}
