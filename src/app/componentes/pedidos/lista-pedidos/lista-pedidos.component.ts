import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CancelarTicketRequest } from 'src/app/modelo/CancelarTicketRequest';
import { Pedido } from 'src/app/modelo/pedido';
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ModalConfirmacionComponent } from '../../modal-confirmacion/modal-confirmacion.component';
import { ModalClose } from 'src/app/layouts/modal-close/modal-close.layout';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  
  @Input() pedidos:Pedido[]; 
  paginaActual:number = 1; 
  modalOptions: NgbModalOptions;

  constructor(private usuarioService:UsuarioService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuarioService.getPedidos().then(pedidos => this.setearPedido(pedidos));
  }

  setearPedido(pedidos){
    this.pedidos = pedidos;
    //console.log(pedidos)
  }

  async cancelarPedido(id:number):Promise<any> {
      try{
        var ticket:CancelarTicketRequest = new CancelarTicketRequest(id);
        await this.usuarioService.cancelarPedido(ticket);
        this.usuarioService.getPedidos().then(pedidos => this.setearPedido(pedidos));
        this.crearModal('Cancelación pedido', 'El pedido se ha cancelado satistfactoriamente');     
      }
      catch(error){
        console.log(error);
        this.crearModal('Cancelación pedido', 'No se pudo cancelar el pedido. Intente nuevamente mas tarde');
      }
  }

  async cancelarPedidoFuncion(ticket){
    await this.usuarioService.cancelarPedido(ticket);
  }

  crearModal(titulo:string, descripcion:string){
    const modalInform = this.modalService.open(ModalClose);
    modalInform.componentInstance.title = titulo;
    modalInform.componentInstance.description = descripcion;
  }
}