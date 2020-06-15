/* Módulos */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

/* Componentes */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/usuario/login/login.component';
import { RegistroComponent } from './componentes/usuario/registro/registro.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CrearPedidoComponent } from './componentes/pedidos/crear-pedido/crear-pedido.component';
import { ListaPedidosComponent } from './componentes/pedidos/lista-pedidos/lista-pedidos.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';

/* Servicios */
import { UsuarioService } from './servicios/usuario.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Layout */
import { ModalClose } from './layouts/modal-close/modal-close.layout';

import { AuthGuard } from './auth/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    InicioComponent,
    ModalClose,
    CrearPedidoComponent,
    ListaPedidosComponent,
    PedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  exports:[
    HttpClientModule
  ],
  providers: [UsuarioService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }