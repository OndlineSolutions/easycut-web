import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamento } from 'src/app/core/model/agendamento';
import { environment } from 'src/environments/environment';
import { CommomService } from '../commom/commom.service';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private readonly API = environment.url_api;

  constructor(private http: HttpClient, private commomService: CommomService) {}

  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.API}/agendamentos/todos?estabelecimento_ID=4`);
  }

  getAgendamentosDia(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.API}/agendamentos/hoje?estabelecimento_ID=4`);
  }

  CadastraAgendamentos(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(`${this.API}/agendamentos`, agendamento);
  }

  filtrarAgendamentos(filter: string, status: string, dtInicial: string, dtFinal: string): Observable<Agendamento[]> {
    let estabelecimentoID = this.commomService.estabelecimentoId
    return this.http.get<Agendamento[]>(`${this.API}/agendamentos/filtro`, {
      params: { estabelecimento_ID: estabelecimentoID , filtro: filter, status: status, dt_inicial: dtInicial, dt_final: dtFinal}
    })
  }
}
