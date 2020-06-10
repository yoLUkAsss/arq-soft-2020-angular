import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Usuario } from '../modelo/usuario';

export const baseURL = 'http://localhost:4200'

@Injectable()
export class UsuarioService {
    constructor(private httpClient: HttpClient) {}

    async crearUsuario(usuario: Usuario): Promise<any>{
        return await this.httpClient.post(baseURL+'/users', usuario,
          {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)
      }).toPromise()
    }
}