import { Insumo } from './insumo';
import { Estado } from './estado';

export class Pedido{
    email:string;
    insumo:Insumo;
    estados:Array<Estado>;

    constructor(email:string, insumo:Insumo, estados:Array<Estado>){
        this.email = email;
        this.insumo = insumo;
        this.estados = estados;
    }

    static crearDesdeJson(json:any): Pedido{
        const ticket = new Pedido(json.cliente.email, json.insumo, json.estados.map(estado => Estado.crearDesdeJson(estado)));
        return ticket;
      }
}