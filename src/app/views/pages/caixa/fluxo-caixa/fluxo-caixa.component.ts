import { FechamentoCaixaComponent } from './../../../../core/lib/components/modais/fechamento-caixa/fechamento-caixa/fechamento-caixa.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Venda } from 'src/app/core/model/nova-venda';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'vex-fluxo-caixa',
  templateUrl: './fluxo-caixa.component.html',
  styleUrls: ['./fluxo-caixa.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FluxoCaixaComponent implements OnInit {

  dataSource: MatTableDataSource<Venda>;
  columnsToDisplay = ['data', 'cliente', 'qtd', 'valor'];

  expandedElement: Venda | null;

  @Output() trocaTab: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Venda>(this.listaFluxoCaixa);
  }

  fecharCaixa() {
    const dialogRef = this.dialog.open(FechamentoCaixaComponent)
    dialogRef.afterClosed().subscribe()
  }

  trocarTab() {
    this.trocaTab.emit({ data: 0 });
  }

  listaFluxoCaixa: Venda[] = [
    {
      data: '08/11/2023',
      cliente: 'Vitor',
      qtd: 4,
      valor: 'R$ 24,00',
      detalhes: [
        {
          detalheNome: `cerveja`,
          detalheQtd: 4,
          detalheValor: 'R$ 24,00',
          status: 'confirmado'
        },
      ],
    },
    {
      data: '10/11/2023',
      cliente: 'Vitor Algusto',
      qtd: 2,
      valor: 'R$ 62,00',
      detalhes: [
        {
          detalheNome: `barba`,
          detalheQtd: 1,
          detalheValor: 'R$ 32,00',
          status: 'confirmado'
        },
        {
          detalheNome: `corte simples`,
          detalheQtd: 1,
          detalheValor: 'R$ 30,00',
          status: 'cancelado'
        },
      ],
    },
    {
      data: '09/11/2023',
      cliente: 'Paulo Vitor',
      qtd: 14,
      valor: 'R$ 100,00',
      detalhes: [
        {
          detalheNome: `pomada`,
          detalheQtd: 1,
          detalheValor: 'R$ 20,00',
          status: 'cancelado'
        },
        {
          detalheNome: `fixa de cinuca`,
          detalheQtd: 10,
          detalheValor: 'R$ 20,00',
          status: 'cancelado'
        },
        {
          detalheNome: `shampoo`,
          detalheQtd: 1,
          detalheValor: 'R$ 20,00',
          status: 'confirmado'
        },
        {
          detalheNome: `corte infantil`,
          detalheQtd: 2,
          detalheValor: 'R$ 40,00',
          status: 'confirmado'
        },
      ],
    },
    {
      data: '10/11/2023',
      cliente: 'Vitor Thales',
      qtd: 11,
      valor: 'R$ 240,00',
      detalhes: [
        {
          detalheNome: `completo casamento`,
          detalheQtd: 1,
          detalheValor: 'R$ 180,00',
          status: 'cancelado'
        },
        {
          detalheNome: `cerveja`,
          detalheQtd: 10,
          detalheValor: 'R$ 60,00',
          status: 'cancelado'
        },
      ],
    },
    {
      data: '10/11/2023',
      cliente: 'Vitor Raimundo',
      qtd: 4,
      valor: 'R$ 36,00',
      detalhes: [
        {
          detalheNome: `fixa sinuca`,
          detalheQtd: 3,
          detalheValor: 'R$ 6,00',
          status: 'confirmado'
        },
        {
          detalheNome: `corte simples`,
          detalheQtd: 1,
          detalheValor: 'R$ 30,00',
          status: 'confirmado'
        },
      ],
    },
  ];

}
