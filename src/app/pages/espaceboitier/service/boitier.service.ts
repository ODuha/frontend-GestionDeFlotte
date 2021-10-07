///<reference path="../interface/boitier.interface.ts"/>
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Promise} from "q";
import {promise} from "selenium-webdriver";
import { Observable } from "rxjs";
import { config } from '../../../config';
import { LoginService } from '../../../login.service';
import { Boitier, Brancher, Engine, Sim, Type_boitier, Type_engine, Type_operateur } from './Boitier';
import { BoitierInterface } from '../interface/boitier.interface';
import { Client, Compte } from "../../espaceclient/service/Client";

@Injectable()
export class BoitierService extends BoitierInterface
{

  constructor(private loginService : LoginService,public http: HttpClient)
  {
    super();

  }
  installation(brancher: Brancher):Promise<any>
  {
    console.log(brancher);
    let promise = Promise((resolve, reject) => {
      this.http.post<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/installation",brancher).toPromise()
        .then(data=>
          {
            console.log(data);
            console.log("success");
          },msg=>
          {

            console.log("errors");
            reject(msg);
          }
        )

    });
    return promise ;
  }
    
  

getTypeboitier():Observable<Type_boitier[]>{
  return this.http.get<Type_boitier[]>(`${config.apiUrl}/type_boitier`);
}
getTypeoperateur():Observable<Type_operateur[]>{
  return this.http.get<Type_operateur[]>(`${config.apiUrl}/type_operateur`);
}
getTypeengine():Observable<Type_engine[]>{
  return this.http.get<Type_engine[]>(`${config.apiUrl}/type_engine`);
}
getBrancher():Observable<Brancher[]>{
  return this.http.get<Brancher[]>(`${config.apiUrl}/brancher`);
}
}
