import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../validaciones/must-match.validator';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalClose } from 'src/app/layouts/modal-close/modal-close.layout';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formularioRegistro: FormGroup;
  submitted = false;
  

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService:UsuarioService, private _modalService: NgbModal) {}

  get f() { return this.formularioRegistro.controls; }

  async registrar(): Promise<void> {
    this.submitted = true;
    try {
      if (this.formularioRegistro.valid){
        var usuario:Usuario = new Usuario(
          this.formularioRegistro.get('nombre').value,
          this.formularioRegistro.get('email').value,
          this.formularioRegistro.get('telefono').value,
          this.formularioRegistro.get('entidad').value,
          this.formularioRegistro.get('cargo').value,
          this.formularioRegistro.get('localidad').value,
          this.formularioRegistro.get('password').value
        );
        await this.usuarioService.crearUsuario(usuario);
        this.crearModal('Alta de usuario', 'El usuario se ha dado de alta satistfactoriamente');

      }
    } catch (error) {
        console.log(error.error);
        this.crearModal('Alta de usuario', 'No se ha podido crear el nuevo usuario, intente nuevamente mas tarde');
    }
  }

  ngOnInit() {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      entidad: ['', Validators.required],
      cargo: ['', Validators.required],
      localidad: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmarPassword')
    });
  }

  crearModal(titulo:string, descripcion:string){
    const modalInform = this._modalService.open(ModalClose);
    modalInform.componentInstance.title = titulo;
    modalInform.componentInstance.description = descripcion;
    this.router.navigate(['/inicio']);

  }
}


