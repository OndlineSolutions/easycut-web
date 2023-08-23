import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';

import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { Usuario } from './../../model/usuario';
import { EstabelecimentoService } from '../../services/estabelecimento/estabelecimento.service'; //importação criada

@Component({
    selector: 'vex-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInUp400ms]
})
export class LoginComponent {
    form: FormGroup;

    inputType = 'password';
    visible = false;

    icVisibility = icVisibility;
    icVisibilityOff = icVisibilityOff;

    public usuario = new Usuario();

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private snackbar: MatSnackBar,
        private estabelecimentoService: EstabelecimentoService //service do estabelecimento

    ) {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    send() {
        console.log(this.usuario);
        this.router.navigate(['/']);
        this.snackbar.open(
            'Seu login foi efetuado com sucesso. Parabéns!',
            'Obrigado',
            {
                duration: 5000
            }
        );
    }

    toggleVisibility() {
        if (this.visible) {
            this.inputType = 'password';
            this.visible = false;
            this.cd.markForCheck();
        } else {
            this.inputType = 'text';
            this.visible = true;
            this.cd.markForCheck();
        }
    }
    ngOnInit(): void {

    }

    recuperarSenha() {
        this.estabelecimentoService.recuperarSenha().subscribe(
            response => {
                this.snackbar.open(response.message, 'Fechar', {
                    duration: 5000
                });
            },
            error => {
                this.snackbar.open(error.message, 'Fechar', {
                    duration: 5000,
                    panelClass: ['error-snackbar']
                });
            }
        );
    }

}
