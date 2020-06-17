import { Insumo } from './insumo';
import { Estado } from './estado';

export class Pedido{
    id:number;
    email:string;
    insumo:Insumo;
    estados:Array<Estado>;

    constructor(email:string, insumo:Insumo, estados:Array<Estado>){
        this.email = email;
        this.insumo = insumo;
        this.estados = estados;
    }

    public setId(id:number){
        this.id = id;
    }

    static crearDesdeJson(json:any): Pedido{
        const ticket = new Pedido(json.cliente.email, json.insumo, json.estados.map(estado => Estado.crearDesdeJson(estado)));
        ticket.setId(json.id);
        return ticket;
      }
}