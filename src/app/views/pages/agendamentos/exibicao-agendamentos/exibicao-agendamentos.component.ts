import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CadastrarEditarComponent } from 'src/app/core/lib/components/modais/agendamentos/cadastrar-editar/cadastrar-editar.component';
import { Agendamento } from 'src/app/core/model/agendamento';
import { AgendamentoService } from 'src/app/core/services/agendamentos/agendamentos.service';
import { ConfirmacaoComponent } from 'src/app/core/lib/components/modais/confirmacao/confirmacao.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EventEmitterService } from 'src/app/core/services/event.service';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { EditarStatusComponent } from 'src/app/core/lib/components/modais/agendamentos/editar-status/editar-status/editar-status.component';
import { MessagesSnackBar } from 'src/app/core/constants/messagesSnackBar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommomService } from 'src/app/core/services/commom/commom.service';

@Component({
	selector: 'vex-exibicao-agendamentos',
	templateUrl: './exibicao-agendamentos.component.html',
	styleUrls: ['./exibicao-agendamentos.component.scss'],
})

export class ExibicaoAgendamentosComponent implements AfterViewInit, OnInit {

	form: FormGroup;
	load: boolean = false;
	currentStatus: any;
	agendamentoHoje: number;
	listaAgendamentos: Agendamento[] = [];

	dataSource = new MatTableDataSource<Agendamento>();
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	displayedColumns: string[] = [
		'cliente',
		'servico',
		'tempo',
		'valor',
		'data',
		'responsavel',
		'status',
		'icone',
	];

	constructor(public dialog: MatDialog,
		private agendamentoService: AgendamentoService,
		private snackbar: MatSnackBar,
		private fb: FormBuilder
	) {
		this.form = this.fb.group({
			filtro: [''],
			status: [''],
			dtInicial: [''],
			dtFinal: ['']
		})
	}

	ngOnInit(): void {
		EventEmitterService.get("buscarAgendamentos").subscribe(() => this.getAgendamentos());
		this.getAgendamentos();
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	filtrarAgendamentos() {
		this.load = true;
		let form = this.form.value;
		this.agendamentoService.filtrarAgendamentos(form.filtro, form.status, form.dtInicial, form.dtFinal).subscribe(response => {
			this.listaAgendamentos = response;
			this.dataSource = new MatTableDataSource<Agendamento>(this.listaAgendamentos);
			this.dataSource.paginator = this.paginator;
			this.load = false;
		},
			(error) => {
				this.load = false;
				this.snackbar.open(
					MessagesSnackBar.ERRO_LISTAR_AGENDAMENTO,
					"Fechar",
					{
						duration: 3000
					}
				)
				console.log(error)
			});
	}

	limparFiltro() {
		this.form.reset();
	}

	getAgendamentos() {
		this.load = true;
		this.agendamentoHoje = +window.localStorage.getItem('agendamentoHoje');
		window.localStorage.removeItem('agendamentoHoje');
		this.agendamentoService.getAgendamentos().subscribe(response => {
			this.listaAgendamentos = response;
			this.dataSource = new MatTableDataSource<Agendamento>(this.listaAgendamentos);
			this.dataSource.paginator = this.paginator;
			this.load = false;
		},
			(error) => {
				this.load = false;
				console.log(error)
			});
	}
	abrirModalCadastrarEditar(agendamento?: Agendamento) {
		let dialogRef = this.dialog.open(CadastrarEditarComponent,
			{
				data: { agendamento: agendamento },
				width: '450px',
			});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.getAgendamentos();
				//chama sua listagem
			}
		});
	}

	abrirModalDeletar(agendamento: Agendamento): void {
		const dialogRef = this.dialog.open(ConfirmacaoComponent, {
			data: {
				itens: [agendamento.nomeServico],
				legendaAcao: 'Tem certeza que deseja EXCLUIR esse item?'
			}
		});


		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.excluirAgendamento(agendamento);
			}
		});
	}

	abrirModalEditarStatus(statusFinal: string, agendamento?: Agendamento) {
		let statusInicial: string = this.listaAgendamentos.find(x => x.id == agendamento.id)?.status;
		let dialogRef = this.dialog.open(EditarStatusComponent,
			{
				data: {
					statusInicial: statusInicial,
					statusFinal: statusFinal,
					agendamento: agendamento
				},
			});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.getAgendamentos();
			}
		});
	}


	excluirAgendamento(agendamento: Agendamento): void {
		this.agendamentoService.deletarAgendamento(agendamento.id).subscribe(() => {
			this.getAgendamentos();
			this.snackbar.open(
				MessagesSnackBar.DELETAR_AGENDAMENTO,
				"Fechar",
				{
					duration: 3000
				}
			)
		}, (error) => {
			this.snackbar.open(
				MessagesSnackBar.ERRO_DELETAR_AGENDAMENTO,
				"Fechar",
				{
					duration: 3000
				}
			)
		})
	}
}
