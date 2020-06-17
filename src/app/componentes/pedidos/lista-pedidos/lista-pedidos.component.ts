import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CancelarTicketRequest } from 'src/app/modelo/CancelarTicketRequest';
import { Pedido } from 'src/app/modelo/pedido';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  
  pedidos:Array<any>;  

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getPedidos().then(pedidos => this.setearPedido(pedidos));
  }

  setearPedido(pedidos){
    this.pedidos = pedidos;
    console.log(pedidos)
  }

  async cancelarPedido(id){
    var ticket:CancelarTicketRequest = new CancelarTicketRequest(id);
    try{
      await this.usuarioService.cancelarPedido(ticket);
    }
    catch(error){
      console.log(error);
    }
    
  }
}