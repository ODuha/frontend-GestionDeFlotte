import {Injectable} from "@angular/core";
import {DatePipe} from "@angular/common";

@Injectable()
export class Client
{
  id:number;
  nom:string;
  prenom:string;
  cine:string;
  rc:string;
  nom_societe:string;
  tel:string;
  email:string;
  adresse:string;
  id_maloc:number;
  verifie:boolean;
  actif:boolean;
  type:number;
  comptes:Array<Compte>;
  constructor()
  {
    this.type=1;
    this.comptes=[];
  }
}
export class Compte
{
  id:number;
  login:string;
  email:string;
  password:string;
  tel:string;
  
  constructor(c?:Client)
  {
    if(c){
      console.log(c);
    var datePipe = new DatePipe('en-US');
    this.password=datePipe.transform(new Date(),"ddMMyyyy");
    this.email=c.email;
    this.login=c.nom?c.nom:c.nom_societe;
    this.tel = c.tel;
  }
    
  }

  


}
