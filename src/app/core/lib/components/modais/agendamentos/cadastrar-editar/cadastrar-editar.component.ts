import { Component, Inject, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesSnackBar } from 'src/app/core/constants/messagesSnackBar';
import { Agendamento } from 'src/app/core/model/agendamento';
import { AgendamentoService } from 'src/app/core/services/agendamentos/agendamentos.service';


@Component({
  selector: 'vex-cadastrar-editar',
  templateUrl: './cadastrar-editar.component.html',
  styleUrls: ['./cadastrar-editar.component.scss']
})
export class CadastrarEditarComponent {

  load: boolean = false;

  agendamento = new Agendamento();
  estabelecimentoID = window.localStorage.getItem('estabelecimento_ID');

  form: FormGroup;
  isCadastro!: boolean;
  legendaBotao: string = '';
  opcoesStatus = [];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<CadastrarEditarComponent>,
    private readonly fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private snackbar: MatSnackBar,
  ) {
    this.isCadastro = !data?.agendamento;
    this.legendaBotao = this.isCadastro ? "Adicionar" : "Confirmar";
    this.opcoesStatus = this.filtrarOpcoes();
    this.iniciaFormulario();
  }

  iniciaFormulario() {
    this.form = this.fb.group({
      nomeCliente: [this.data?.agendamento?.nomeCliente, [Validators.required]],
      nomeServico: [this.data?.agendamento?.nomeServico, [Validators.required]],
      tempoEstimado: [this.data?.agendamento?.tempoEstimado, [Validators.required, Validators.pattern("^[0-9]*$")]],
      valor: [this.data?.agendamento?.valor, [Validators.required, Validators.pattern("^[0-9]*$")]],
      dtAtendimento: [this.data?.agendamento?.dtAtendimento, [Validators.required, this.dateValidator]],
      status: [this.data?.agendamento?.status, [Validators.required]],
      hrAtendimento: [this.data?.agendamento?.hrAtendimento, [Validators.required]],
      responsavel: [this.data?.agendamento?.responsavel]
    })
  }
  responsavelObrigatorio(event: any) {
    if (event?.value == 'aceito') {
      this.form.controls['responsavel'].setValidators([Validators.required]);
    }

    else {
      this.form.controls['responsavel'].setValidators([]);
    }
    this.form.controls['responsavel'].patchValue(this.form.get('responsavel').value)
  }

  cadastrarAgendamento() {
    if (this.form.invalid) {
      this.snackbar.open(
        MessagesSnackBar.ERRO_VALIDACAO,
        "Fechar",
        { duration: 3850 });
      return;
    }
    this.load = true;
    this.agendamento = this.form.value;
    this.agendamento.estabelecimentoID = +this.estabelecimentoID;
    this.agendamentoService.CadastraAgendamentos(this.form.value).subscribe(() => {
      this.load = false;
      this.dialogRef.close(true);
      this.snackbar.open(
        MessagesSnackBar.ADICIONAR_AGENDAMENTO,
        "Fechar",
        {
          duration: 3000
        }
      )
    }, (error) => {
      this.load = false;
      console.log(error);
      this.snackbar.open(
        MessagesSnackBar.ERRO_ADICIONAR_AGENDAMENTO,
        "Fechar",
        {
          duration: 3000
        }
      )
    })

  }

  editarAgendamento() {
    if (this.form.invalid) {
      this.snackbar.open(
        MessagesSnackBar.ERRO_VALIDACAO,
        "Fechar",
        { duration: 3850 });
      return;
    }
    this.load = true;
    this.agendamento = this.form.value;
    this.agendamento.id = this.data.agendamento.id;
    this.agendamento.estabelecimentoID = +this.estabelecimentoID;
    this.agendamentoService.alterarAgendamento(this.agendamento).subscribe(response => {
      this.load = false;
      this.dialogRef.close(true);
      this.snackbar.open(
        MessagesSnackBar.EDITAR_AGENDAMENTO,
        "Fechar",
        {
          duration: 3000
        }
      )
    }, (error) => {
      this.load = false;
      console.log(error);
      this.snackbar.open(
        MessagesSnackBar.ERRO_EDITAR_AGENDAMENTO,
        "Fechar",
        {
          duration: 3000
        }
      )
    })
  }

  cadastrarEditarAgendamento() {
    this.isCadastro ? this.cadastrarAgendamento() : this.editarAgendamento();
  }

  filtrarOpcoes(): any[] {
    if (this.isCadastro) {
      return [
        {
          nome: "Aceito",
          valor: "aceito"
        },
        {
          nome: 'Pendente',
          valor: "pendente",
        }
      ]
    }
    else {
      return [
        {
          nome: "Aceito",
          valor: "aceito"
        },
        {
          nome: 'Pendente',
          valor: "pendente",
        },
        {
          nome: "Recusado",
          valor: "cancelado"
        }
      ]
    }
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return { 'validDate': true };
    }
    return null;
  }


}
