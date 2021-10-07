import {Component, OnDestroy, TemplateRef} from '@angular/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import {System, SystemInterface} from "../../system/system.interface";
import {DeviceInterface, infos} from "./interfaces/device.interface";
import { interval } from 'rxjs/observable/interval';
import {Promise} from "q";
@Component({
  selector: 'ngx-devices',
  styleUrls: ['./devices.component.scss'],
  templateUrl: './devices.component.html',
})
export class DevicesComponent implements OnDestroy {
  d : boolean;
  private alive = true;
maloc_api_etat = null;
show_connexion_btn = false;
maloc_engine_etat = null;
maloc_job_etat = null;
  FIN_WAIT2=null;
  CLOSE_WAIT=null;
  ESTABLISHED=null;
  SYN_RECV=null;
  LAST_ACK=null;
  TIME_WAIT=null;
  established=null;
  LISTEN=null;
  Foreign=null;
  FIN_WAIT1=null;
  maloc_api_count : number;
  maloc_engine_count : number;
  maloc_job_count : number;
  systemData : System;
  system : number;


  devicesData: {};
  infos: number;
  devicesOff = false;
  temperatureMode = 'cool';

  devicesData_p: {};
  infos_p: number;
  devicesOff_p = false;
  temperatureMode_p = 'cool';

  theme: any;
  themeSubscription: any;

  constructor(private themeService: NbThemeService,
              private deviceInfosService : DeviceInterface , private systemService:SystemInterface,private dialogService: NbDialogService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
      this.theme = config.variables.temperature;
    });
this.deviceInfosService.getDeviceInfoData().then(data=> {
  this.deviceInfosService.getInfos()
    .subscribe(infos => {
      this.devicesData = {min: 0, max: infos.total, value: infos.operationnel};
      this.infos = infos.operationnel;
      this.devicesData_p = {min: 0, max: 100, value: (infos.operationnel / infos.total) * 100};
      this.infos_p = (infos.operationnel / infos.total) * 100;
    });
});
    interval(7000).subscribe(val =>{
      this.systemService.getSystemData()
      .subscribe(data => {
        this.FIN_WAIT2=data.response.FIN_WAIT2;
        this.CLOSE_WAIT=data.response.CLOSE_WAIT;
        this.ESTABLISHED=data.response.ESTABLISHED;
        this.SYN_RECV=data.response.SYN_RECV;
        this.LAST_ACK=data.response.LAST_ACK;
        this.TIME_WAIT=data.response.TIME_WAIT;
        this.established=data.response.established;
        this.LISTEN=data.response.LISTEN;
        this.Foreign=data.response.Foreign;
        this.FIN_WAIT1=data.response.FIN_WAIT1;
        this.maloc_api_etat = data.response.maloc_api_etat;
        this.maloc_engine_etat = data.response.maloc_engine_etat;
        this.maloc_job_etat = data.response.maloc_job_etat;
        if(this.maloc_api_etat)
          this.maloc_api_count = data.response.maloc_api_count;
        if(this.maloc_engine_etat)
          this.maloc_engine_count = data.response.maloc_engine_count;
        if(this.maloc_job_etat)
          this.maloc_job_count = data.response.maloc_job_count;
        this.show_connexion_btn = true;
      })});



  }
  openWithoutBackdrop(dialog: TemplateRef<any>,message:string) : Promise<any> {
    let promise = Promise((resolve, reject) =>
    {
      return this.dialogService.open(
        dialog,
        {
          context: 'Attention voulez vous vraiment '+message+' ?',
          hasBackdrop: false,
        }).onClose.toPromise().then(d=>
      {
        console.log(this.d);
        resolve(this.d);
      },msg=>
      {
        console.log(msg);
        reject(msg);
      })
        ;
    });
    return promise;

  }
  stopTCPIP(dialog,message,action):void{
    this.openWithoutBackdrop(dialog,message).then(d=> {
      if (d == true) {
        this.systemService.stopTPCIP(action)
          .then(value=>
          {
            this.show_connexion_btn=false;
            alert("succes");
           // this.maloc_api_etat = null;
          },msg=>
          {
            alert("problem");
          });
      }
      else {

      }
    },msg=>
    {

    });
  }
  stopMalocAPI(dialog):void{
    let message = "arreter l'API";
    this.openWithoutBackdrop(dialog,message).then(d=> {
      if (d == true) {
        this.systemService.stopMalocAPI()
          .then(value=>
          {
            alert("succes");
            this.maloc_api_etat = null;
          },msg=>
          {
            alert("problem");
          });
      }
      else {

      }
    },msg=>
    {

    });
  }
  startMalocAPI(dialog):void{
    let message = "demarrer l'API";
    this.openWithoutBackdrop(dialog,message).then(d=> {
      if (d == true) {
        this.systemService.startMalocAPI()
          .then(value=>
          {
            alert("succes");
            this.maloc_api_etat = null;
          },msg=>
          {
            alert("problem");
          });
      }
      else {

      }
    },msg=>
    {

    });
  }
  stopMalocJOB(dialog):void{
    let message = "arreter JOB";
    this.openWithoutBackdrop(dialog,message).then(d=> {
      if (d == true) {
        this.systemService.stopMalocJOB()
          .then(value=>
          {
            alert("succes");
            this.maloc_job_etat = null;
          },msg=>
          {
            alert("problem");
          });
      }
      else {

      }
    },msg=>
    {

    });
  }
  startMalocJOB(dialog):void{
    let message = "demarrer JOB";
    this.openWithoutBackdrop(dialog,message).then(d=> {
      if (d == true) {
        this.systemService.startMalocJOB()
          .then(value=>
          {
            alert("succes");
            this.maloc_job_etat = null;
          },msg=>
          {
            alert("problem");
          });
      }
      else {

      }
    },msg=>
    {

    });
  }
  startMalocENGINE(dialog):void{
    let message = "demarrer le Moteur";
    this.openWithoutBackdrop(dialog,message).then(d=> {
      if (d == true) {
        this.systemService.startMalocENGINE()
          .then(value=>
          {
            alert("succes");
            this.maloc_engine_etat = null;
          },msg=>
          {
            alert("problem");
          });
      }
      else {

      }
    },msg=>
    {

    });
}
  stopMalocENGINE(dialog):void{
    let message = "arreter le Moteur";
    this.openWithoutBackdrop(dialog,message).then(d=> {
      if (d == true) {
        this.systemService.stopMalocENGINE()
          .then(value=>
          {
            alert("succes");
            this.maloc_engine_etat = null;
          },msg=>
          {
            alert("problem");
          });
      }
      else {

      }
    },msg=>
    {

    });
  }
  ngOnDestroy(){
    this.alive = false;
  }
}
