import {Injectable, OnInit} from "@angular/core";
import {System, SystemInterface} from "./system.interface";
import { of as observableOf,  Observable } from 'rxjs';
import {LoginService} from "../../login.service";
import {HttpClient} from "@angular/common/http";
import {config} from "../../config";
import {tap} from "rxjs/internal/operators";
import {Promise} from "q";
@Injectable()
export class SystemService extends SystemInterface {

  constructor(private loginService: LoginService, public http: HttpClient, public http2: HttpClient) {
    super();

  }

  private systemData: System = {value: 0, min: 0, max: 0};

  private systemData_p: System = {value: 0, min: 0, max: 0};

  getSystemData(): Observable<any> {
    return this.http.get<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/osinfos").pipe(
      tap(data => {
        console.log(data);
      }));

  }

  getSystemData_p(): Observable<System> {
    this.http2.get<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/osinfos").pipe(
      tap(data => {
        console.log(data);
        this.systemData_p.max = 100;
        this.systemData_p.min = 0;
        this.systemData_p.value = (data.response.used_memory / data.response.total_memory) * 100;

      }));
    return observableOf(this.systemData_p);
  }

  stopMalocAPI(): Promise<any> {
    let promise = Promise((resolve, reject) => {
      this.http2.post<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/stop_maloc_api", {title: 'Angular POST Request Example'}).toPromise()
        .then(data => {
          console.log(data);
          if (data.state == "success")
            resolve(true);
          else
            reject(false);
        }, msg => {

          reject(false);
        })
    });
    return promise;
  }

  startMalocAPI(): Promise<any> {
    let promise = Promise((resolve, reject) => {
      this.http2.post<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/start_maloc_api", {title: 'Angular POST Request Example'}).toPromise()
        .then(data => {
          console.log(data);
          if (data.state == "success")
            resolve(true);
          else
            reject(false);
        }, msg => {

          reject(false);
        })
    });
    return promise;
  }

  stopMalocJOB(): Promise<any> {

    let promise = Promise((resolve, reject) => {
      this.http.post<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/stop_maloc_job", {title: 'Angular POST Request Example'}).toPromise()
        .then(data => {
          console.log(data);
          if (data.state == "success")
            resolve(true);
          else
            reject(false);
        }, msg => {

          reject(false);
        })
    });
    return promise;
  }

  startMalocJOB(): Promise<any> {

    let promise = Promise((resolve, reject) => {
      this.http2.post<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/start_maloc_job", {title: 'Angular POST Request Example'}).toPromise()
        .then(data => {
          console.log(data);
          if (data.state == "success")
            resolve(true);
          else
            reject(false);
        }, msg => {

          reject(false);
        })
    });
    return promise;
  }

  stopMalocENGINE(): Promise<any> {
    let promise = Promise((resolve, reject) => {
      this.http2.post<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/stop_maloc_engine", {title: 'Angular POST Request Example'}).toPromise()
        .then(data => {
          console.log(data);
          if (data.state == "success")
            resolve(true);
          else
            reject(false);
        }, msg => {

          reject(false);
        })
    });
    return promise;
  }
  startMalocENGINE(): Promise<any> {
      let promise = Promise((resolve, reject) => {
        this.http2.post<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/start_maloc_engine", {title: 'Angular POST Request Example'}).toPromise()
          .then(data => {
            console.log(data);
            if (data.state == "success")
              resolve(true);
            else
              reject(false);
          }, msg => {

            reject(false);
          })
      });
      return promise;
  }
  stopTPCIP(type:any): Promise<any> {
    let promise = Promise((resolve, reject) => {
      this.http2.post<any>(`${config.apiUrl}/bo/` + this.loginService.getJwtToken() + "/stop_tcpip", type).toPromise()
        .then(data => {
          console.log(data);
          if (data.state == "success")
            resolve(true);
          else
            reject(false);
        }, msg => {

          reject(false);
        })
    });
    return promise;
  }
}
