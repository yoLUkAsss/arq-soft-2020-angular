import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  pedidos:Array<any>;
  

  constructor(private usuarioService:UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarioService.getPedidos().then(pedidos => this.cuis(pedidos));
  }

  cuis(pedidos){
    this.pedidos = pedidos;
    console.log(pedidos)
  }
}