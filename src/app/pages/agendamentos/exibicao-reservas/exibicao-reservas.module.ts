import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExibicaoReservasRoutingModule } from './exibicao-reservas-routing.module';
import { ExibicaoReservasComponent } from './exibicao-reservas.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { LibVexModule } from 'src/app/modules/lib-vex.module';

@NgModule({
    declarations: [ExibicaoReservasComponent],
    imports: [
        CommonModule,
        ExibicaoReservasRoutingModule,
        MaterialModule,
        LibVexModule
    ],
    exports: [ExibicaoReservasComponent]
})
export class ExibicaoReservasModule {}
