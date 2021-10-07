import { Observable } from 'rxjs';
import {Promise} from "q";

export interface System {
  value: number;
  min: number;
  max: number;
}

export abstract class SystemInterface {
  abstract getSystemData(): Observable<any>;
  abstract stopMalocAPI(): Promise<any>;
  abstract startMalocAPI(): Promise<any>;
  abstract stopMalocJOB(): Promise<any>;
  abstract startMalocJOB(): Promise<any>;
  abstract stopMalocENGINE(): Promise<any>;
  abstract startMalocENGINE(): Promise<any>;
  abstract stopTPCIP(type:any): Promise<any>;
  abstract getSystemData_p(): Observable<System>;
}
