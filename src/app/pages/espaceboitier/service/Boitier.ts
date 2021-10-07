import {Injectable} from "@angular/core";
import {DatePipe} from "@angular/common";
import { Compte } from '../../espaceclient/service/Client';

@Injectable()
export class Boitier
{
  id:number;
  imei:number;
  port:number;
  version:string;
  panne:boolean;
  test:boolean;
  etat:string;
  etatMMA:number;
  configFileUploaded:boolean;
  observation:string;
  id_maloc:number;
  type_boitier:Type_boitier;
  branches:Array<Brancher>;


  constructor()
  {
  }
}
export class Type_boitier{
  id:number;
  serie:string;
  observation:string;
  seuil:number;
  port:number;
  protocol:Protocol;


}
export class Brancher{
  id:number;
  date_installation:Date;
  date_echeance:Date;
  date_retir:Date;
  id_malloc:number;
  id_boitier:Boitier;
  id_engine:Engine;
  id_compte:Compte;
  id_sim:Sim;
  constructor()
  {
    var datePipe = new DatePipe('en-US');
    
    this.id_boitier = new Boitier();
    this.id_compte = new Compte();
    this.id_sim = new Sim();
    this.id_engine = new Engine();
    
  }

}
export class Protocol{
  id:number;
  name:string;
	id_maloc:number;
  decoder:string;
  type_boitiers:Type_boitier;

}
export class Engine{
  id:number;

  matricule:String;
	marque:String;
	model:String ;
	numeroChassi:number;
	id_maloc:String;
	type_engine:Type_engine;
  branches:Array<Brancher> ;

}
export class User{
  name:String;
}
export class Sim{
  id:number;
	 NSeriesSIM:number;
	  tel:String;
	  etat:String;
	  test:boolean;
	  panne:boolean;
	  proprietaire:String;
	  pin:number;
	  puk:number;
	  volumdata:number;
	  dateactivation:Date;
	  id_maloc:number;
	  type_operateur:Type_operateur;
    branches:Array<Brancher> ;
    importation:Fournir_operateur ;

}

export class Type_operateur{
  id:number;
	nomoperateur:String;
	observation:String;
	seuilAlerte:number;
	idmaloc:number;
	sims: Array<Sim> ;
	fournisseur:Fournisseur ;

}
export class Fournir_operateur{
  id:number;
  qte:number;
	prix:number;
	date_achat:Date;
	id_maloc:number;
	type_operateur:Type_operateur ;
	fournisseurs:Fournisseur ;
	sims:Array<Sim>;

}
export class Fournisseur{
  id:number;
  type:String ;
	pays:String;
	email:String;
	ntel:String;
	observation:String;
	id_maloc:number;
	fournir_dispos:Array<Fournir_dispo> ;
	fournir_operateurs:Array<Fournir_operateur> ;
	fournir_boitiers:Array<Fournir_boitier> ;
	type_operateurs:Array<Type_operateur> ;
	type_boitiers:Array<Type_boitier> ;
	type_dispositifs:Array<Type_dispositif> ;

}

export class Type_engine{
  id:number;
  type:String ;
	id_maloc: number;
	Engines: Array<Engine> ;

}
export class Fournir_dispo{
  id:number;
  qte:number;
  prix: number;
  date_achat:Date;
  id_maloc:number;
  type_dispositif:Type_dispositif ;
  fournisseur:Fournisseur ;

}

export class Fournir_boitier{
  id:number;
  qte:number;
	prix:number;
	date_achat:Date;
	id_maloc:number;
	fournisseur:Fournisseur ;
	type_boitier:Type_boitier ;

}
export class Type_dispositif{
  id:number;
  type:string;
	description:string;
	qteRestante:number;
	dispositifs:Array<Dispositif> ;
	fournirs:Array<Fournir_dispo> ;
	fournisseur:Fournisseur ;
	seuil:number;
	id_maloc:number;

}

export class Dispositif{
  id:number;
  Type:string;
	id_maloc: number;
	typedispositif:Type_dispositif ;
	Dispositif_engines:Array<Dispositif_engine> ;
}

export class Dispositif_engine{
  id:number;
  date_instalation:Date ;
	date_echeance:Date ;
	id_maloc:number;
	dispositif:Dispositif ;
	engine:Engine ;
}
