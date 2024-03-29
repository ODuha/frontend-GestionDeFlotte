import { Observable } from 'rxjs';
import {Promise} from "q";

export interface device {
  id:number,
  internal_code:string,
  id_etat:number,
  imei:number,
  name:string,
  sim:number,
  date_server:number,
  start_date:string,
  end_date:string,
  nbr_vehicle:number,
  protocol_name:string,
  type_name:string,
}
export interface account {
  id:number,
  name:string,
  nbr_device:number
}
export interface infos {
  bloqued:number,
  total:number,
  operationnel:number,
  desabonned:number
  account_bloqued:number,
  neverSend:number
}


export abstract class DeviceInterface {
  abstract getDeviceInfoData(): Promise<any>;
  abstract getBloqued_devices(): Observable<device[]>;
  abstract getBloqued_account(): Observable<account[]>;
  abstract getFonctionnel_devices(): Observable<device[]>;
  abstract getDesabonned_devices(): Observable<device[]>;
  abstract getTotal_devices(): Observable<device[]>;
  abstract getNeverSend_Devices(): Observable<device[]>;
  abstract getInfos(): Observable<infos>;
  abstract update_device(device): Promise<any>;
  abstract delete_device(id_vehicle): Promise<any>;

}
