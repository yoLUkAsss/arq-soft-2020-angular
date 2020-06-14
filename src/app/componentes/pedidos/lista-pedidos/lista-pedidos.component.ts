import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {
  pedido1 = {
    id: '1',
    producto: 'Respiradores',
    medicamento: '-',
    fecha: '13-06-2020',
    estado: 'En proceso'
  };
  pedido2 = {
    id: '2',
    producto: 'Medicamentos',
    medicamento: 'Boquita el mas grande',
    fecha: '12-06-2020',
    estado: 'Cancelado'
  };

  pedidos: Array<any> = new Array();

  constructor() {
    this.pedidos.push(this.pedido1);
    this.pedidos.push(this.pedido2);
  }

  ngOnInit(): void {

  }

}
