import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalClose } from 'src/app/layouts/modal-close/modal-close.layout';
import { CrearTicketDTO } from 'src/app/modelo/crearTicketDTO';
import { Insumo } from 'src/app/modelo/insumo';
import { Medicamento } from 'src/app/modelo/medicamento';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})

export class CrearPedidoComponent implements OnInit {
  formularioCrearPedido: FormGroup;
  submitted = false;
  insumoSeleccionado;
  areaSeleccionada;

  insumos:string[] = [ "Mascara", "Barbijo", "Respirador", "Medicamento", "Guante" ];
  areas:string[] = [ "Atención de pacientes", "Terapia Intensiva", "Técnicos" ];
  

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService, private _modalService: NgbModal) { }

  get f() { return this.formularioCrearPedido.controls;}

  ngOnInit(): void {
    this.formularioCrearPedido = this.formBuilder.group({
      insumo:new FormControl(this.insumoSeleccionado),
      area:new FormControl(""),
      medicamento:new FormControl("")
    });
  }

  async crearPedido(): Promise<void>{
    this.submitted = true;
    console.log(this.formularioCrearPedido.get('medicamento').value);
    try{
      if(this.formularioCrearPedido.valid){
        if('Medicamento' == this.insumoSeleccionado){
          var medicamento:Medicamento = new Medicamento(
            this.formularioCrearPedido.get('insumo').value,
            this.formularioCrearPedido.get('medicamento').value
            );
          var ticket:CrearTicketDTO = new CrearTicketDTO(medicamento);
          console.log(ticket);
          
          await this.usuarioService.crearPedido(ticket).then(resultado => console.log(resultado));
          this.crearModal('Crear pedido', "El pedido se ha creado de forma satisfactoria");
        }
        else{
          var insumo:Insumo = new Insumo(
            this.formularioCrearPedido.get('insumo').value
            );
          var ticket:CrearTicketDTO = new CrearTicketDTO(insumo);
          console.log(ticket);
          
          await this.usuarioService.crearPedido(ticket).then(resultado => console.log(resultado));
          this.crearModal('Crear pedido', "El pedido se ha creado de forma satisfactoria");
        }

      }      
    }
    catch(error){
      console.log(error);
      this.crearModal('Crear pedido', "Falló");
    }
  }

  crearModal(titulo: string, descripcion: string) {
    const modalInform = this._modalService.open(ModalClose);
    modalInform.componentInstance.title = titulo;
    modalInform.componentInstance.description = descripcion;
  }

}