import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

//** Components **//
import {InicioComponent} from "./componentes/inicio/inicio.component";
import {RegistroComponent} from "./componentes/usuario/registro/registro.component";
import {LoginComponent} from "./componentes/usuario/login/login.component";
import { PedidosComponent } from './componentes/pedidos/pedidos.component';



const routes: Routes = [  
  {path: '', component:InicioComponent},
  {path: 'inicio', component:InicioComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'login', component:LoginComponent},
  {path: 'pedido', component:PedidosComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }