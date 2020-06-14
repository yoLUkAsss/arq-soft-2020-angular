import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})

export class CrearPedidoComponent implements OnInit {

  insumos: string[] = [ 'Máscaras protectoras', 'Barbijos', 'Respiradores', 'Medicamentos' ];
  areas: string[] = [ 'Atención de pacientes', 'Terapia Intensiva', 'Técnicos' ];
  insumoSeleccionado;

  constructor() { }

  ngOnInit(): void {
  }

}
