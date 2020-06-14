import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from '@angular/router';

// * Modelos **//
import { Usuario } from '../modelo/usuario';
import { LoginRequest } from '../modelo/loginRequest';

export const baseURL = 'http://localhost:4200'

@Injectable()
export class UsuarioService {
    constructor(private httpClient: HttpClient, private router: Router ) {}

    async crearUsuario(usuario: Usuario): Promise<any>{
        return await this.httpClient.post(baseURL + '/insumos/auth/registro', usuario).toPromise()
    }

    async login(loginRequest:LoginRequest): Promise<any>{
        return await this.httpClient.post(baseURL + '/insumos/auth/login', loginRequest).toPromise()
    }

    estaLogueado():boolean{
        return !! localStorage.getItem('token');
    }

    esAdmin(){
        return !! localStorage.getItem('admin')
    }

    getToken() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/inicio']);
    }
}