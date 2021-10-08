import {Promise} from 'q';
import {Client, Compte} from '../service/Client';
import {Observable} from 'rxjs';

export abstract class ClientInterface {

  abstract  add_client(client: Client): Promise<Client>;
  abstract  client_exist(client: Client): Promise<any>;
  abstract  compte_exist(compte: Compte): Promise<any>;
  abstract update_client(client: Client): Promise<any>;
  abstract desactiver(client: Client): Observable<any>;
}
