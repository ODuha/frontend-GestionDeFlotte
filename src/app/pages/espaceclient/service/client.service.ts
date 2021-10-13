///<reference path="../interface/client.interface.ts"/>
import {Injectable} from '@angular/core';
import {ClientInterface} from '../interface/client.interface';
import {HttpClient} from '@angular/common/http';
import {Promise} from 'q';
import {Observable} from 'rxjs';
import {Client, Compte} from './Client';
import {config} from '../../../config';
import {LoginService} from '../../../login.service';

@Injectable()
export class ClientService extends ClientInterface {
  id; number;
  client: Client;

  client_exist(client: Client): Promise<any> {
    return Promise((resolve, reject) => {
      this.http
        .get<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + '/client_exist?s=' + client.nom_societe)
        .toPromise()
        .then(data => {
            console.log('success');
            resolve(data);
          }, msg => {
            console.log('errors');
            reject(msg);
          },
        );

    });
  }

  compte_exist(compte: Compte): Promise<any> {
    return  Promise((resolve, reject) => {
      this.http
        .get<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + '/compte_exist?login=' + compte.login)
        .toPromise()
        .then(data => {
            console.log('success');
            resolve(data);
          }, msg => {
            console.log('errors');
            reject(msg);
          },
        );
    });
  }

  constructor(private loginService: LoginService, public http: HttpClient) {
    super();

  }

  add_client(client: Client): Promise<any> {
    console.log(client);
    return  Promise((resolve, reject) => {
      this.http.post<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + '/add_client', client).toPromise()
        .then(data => {
            console.log(data);
            console.log('success');
          }, msg => {

            console.log('errors');
            reject(msg);
          },
        );

    });
  }

  getCompte(): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${config.apiUrl}/compte`);
  }

  getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${config.apiUrl}/client`);
  }

  /*
  delete_client(id: number): Observable<any> {
    return this.http.delete<Client[]>(`${config.apiUrl}/delete`);
  }*/
  update_client(client: Client): Promise<any> {
    console.log(client);
    return  Promise((resolve, reject) => {
      this.http
        .put<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + '/update_client', client)
        .toPromise()
        .then(data => {
            console.log('success');
            resolve(data);

          }, msg => {

            console.log('errors');
            reject(msg);
          },
        );

    });
  }

  desactiver(client: Client): Observable<any> {
    console.log(JSON.stringify(client));
    return this.http.put<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + '/desactiver', client);
  }


  setter(client: Client) {
    this.client = client;
  }

}
