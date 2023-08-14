import {
    Component,
    AfterViewInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CadastrarEditarComponent } from 'src/app/modais/agendamentos/cadastrar-editar/cadastrar-editar.component';

@Component({
    selector: 'vex-exibicao-agendamentos',
    templateUrl: './exibicao-agendamentos.component.html',
    styleUrls: ['./exibicao-agendamentos.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExibicaoAgendamentosComponent implements AfterViewInit {
    [x: string]: any;
    displayedColumns: string[] = [
        'cliente',
        'servico',
        'tempo',
        'valor',
        'data',
        'responsavel',
        'botao'
    ];
    dataSource = new MatTableDataSource<Agendamentos>(CLIENTE_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    currentStatus: any;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor(public dialog: MatDialog) {
    }

    openDialog() {
      let dialogRef = this.dialog.open(CadastrarEditarComponent,
        {
          width: '90%',
          height: '83%',
        });
    }
}

export interface Agendamentos {
    cliente: string;
    servico: string;
    tempo: string;
    valor: string;
    data: string;
    responsavel: string;
    status: string;
}
const CLIENTE_DATA: Agendamentos[] = [
    {
        cliente: 'João Pedro Fiuza',
        servico: 'Cabelo + barba',
        tempo: '60 min',
        valor: 'R$ 80,00',
        data: '13/03/2023',
        responsavel: 'Vito Nunes',
        status: 'recusado'
    },
    {
        cliente: 'João Pedro Fiuza',
        servico: 'Cabelo + barba',
        tempo: '60 min',
        valor: 'R$ 80,00',
        data: '13/03/2023',
        responsavel: 'Vito Nunes',
        status: 'aceito'
    },
    {
        cliente: 'João Pedro Fiuza',
        servico: 'Cabelo + barba',
        tempo: '60 min',
        valor: 'R$ 80,00',
        data: '13/03/2023',
        responsavel: 'Vito Nunes',
        status: 'pendente'
    },
    {
        cliente: 'João Pedro Fiuza',
        servico: 'Cabelo + barba',
        tempo: '60 min',
        valor: 'R$ 80,00',
        data: '13/03/2023',
        responsavel: 'Vito Nunes',
        status: 'aceito'
    },
    {
        cliente: 'João Pedro Fiuza',
        servico: 'Cabelo + barba',
        tempo: '60 min',
        valor: 'R$ 80,00',
        data: '13/03/2023',
        responsavel: 'Vito Nunes',
        status: 'pendente'
    },
    {
        cliente: 'João Pedro Fiuza',
        servico: 'Cabelo + barba',
        tempo: '60 min',
        valor: 'R$ 80,00',
        data: '13/03/2023',
        responsavel: 'Vito Nunes',
        status: 'aceito'
    },
    {
        cliente: 'João Pedro Fiuza',
        servico: 'Cabelo + barba',
        tempo: '60 min',
        valor: 'R$ 80,00',
        data: '13/03/2023',
        responsavel: 'Vito Nunes',
        status: 'pendente'
    },
    {
        cliente: 'João Pedro Fiuza',
        servico: 'Cabelo + barba',
        tempo: '60 min',
        valor: 'R$ 80,00',
        data: '13/03/2023',
        responsavel: 'Vito Nunes',
        status: 'aceito'
    }

];
