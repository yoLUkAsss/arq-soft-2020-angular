import { logging } from 'protractor';

export class CancelarTicketRequest{
    idTicket;
 
     constructor(idTicket){
         this.idTicket = idTicket;
     }
 }