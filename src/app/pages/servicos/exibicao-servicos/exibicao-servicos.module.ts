import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExibicaoServicosRoutingModule } from './exibicao-servicos-routing.module';
import { ExibicaoServicosComponent } from './exibicao-servicos.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { LibVexModule } from 'src/app/modules/lib-vex.module';
import { IziTableComponent } from 'src/app/lib/componentes/izi-table/izi-table.component';

@NgModule({
    declarations: [ExibicaoServicosComponent, IziTableComponent],
    imports: [
        CommonModule,
        ExibicaoServicosRoutingModule,
        MaterialModule,
        LibVexModule
    ],
    exports: [ExibicaoServicosComponent]
})
export class ExibicaoServicosModule {}
