import { AgendamentoService } from './../../../app/core/services/agendamentos/agendamentos.service';
import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { NavigationService } from 'src/@vex/services/navigation.service';
import { Agendamento } from 'src/app/core/model/agendamento';
import { EventEmitterService } from 'src/app/core/services/event.service';


@Component({
    selector: 'vex-quickpanel',
    templateUrl: './quickpanel.component.html',
    styleUrls: ['./quickpanel.component.scss']
})
export class QuickpanelComponent implements OnInit{
    date = DateTime.local().toFormat('DD');
    dayName = DateTime.local().toFormat('EEEE');

    listaAgendamentos: Agendamento[] = []

    constructor (private agendamentoService: AgendamentoService,
                 private navigationService: NavigationService
                 ) { }

    ngOnInit(): void {
      EventEmitterService.get("buscarAgendamentosDoDia").subscribe(()=> this.getAgendamentosDia())
    }

    getAgendamentosDia() {
      this.agendamentoService.getAgendamentosDia().subscribe(response => {
        this.listaAgendamentos = response;
        console.log(response)
      },
        (error) => { console.log(error)});
    }

    mostraAgendamento() {
      this.navigationService.items = [
        {
            type: 'link',
            label: 'Agendamentos',
            route: '/agendamentos',
        },]
    }
}
