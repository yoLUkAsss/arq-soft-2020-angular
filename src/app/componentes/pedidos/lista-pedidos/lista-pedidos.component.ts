import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CancelarTicketRequest } from 'src/app/modelo/CancelarTicketRequest';
import { Pedido } from 'src/app/modelo/pedido';
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ModalConfirmacionComponent } from '../../modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  
  @Input() pedidos:Pedido[];  
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
    console.log(id);

      try{
        var ticket:CancelarTicketRequest = new CancelarTicketRequest(id);
        await this.usuarioService.cancelarPedido(ticket);
        //this.usuarioService.getPedidos().then(pedidos => this.setearPedido(pedidos));
        console.log("entra al try");
      }
      catch(error){
        console.log(error);
      }

    
  }

  async cancelarPedidoFuncion(ticket){
    await this.usuarioService.cancelarPedido(ticket);
  }
}