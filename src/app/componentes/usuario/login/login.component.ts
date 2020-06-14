import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { LoginRequest } from 'src/app/modelo/loginRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalClose } from 'src/app/layouts/modal-close/modal-close.layout';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService, private _modalService: NgbModal) { }

  get f() { return this.formularioLogin.controls; }

  async login(): Promise<void> {
    this.submitted = true;
    try {
      if (this.formularioLogin.valid) {
        var loginRequest: LoginRequest = new LoginRequest(
          this.formularioLogin.get('email').value,
          this.formularioLogin.get('password').value
        );

        await this.usuarioService.login(loginRequest).then(
          resultado => localStorage.setItem('token', resultado.token));
          //localStorage.setItem('role', resultado.role)
        this.router.navigate(['/pedido']); 
        
      }
    }
    catch (error) {
      //var errorPantalla: string = error.error.Error;
      console.log(error);
      this.crearModal('LOGIN', "Falló trolo");
    }
  }

  ngOnInit() {
    this.formularioLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  crearModal(titulo: string, descripcion: string) {
    const modalInform = this._modalService.open(ModalClose);
    modalInform.componentInstance.title = titulo;
    modalInform.componentInstance.description = descripcion;  

  }

}
