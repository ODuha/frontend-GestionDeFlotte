import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../espaceclient/service/Client';
import { ClientService } from '../espaceclient/service/client.service';

@Component({
  selector: 'ngx-updateclient',
  templateUrl: './updateclient.component.html', 
  styleUrls: ['./updateclient.component.scss']
})
export class UpdateclientComponent implements OnInit {

 /*
  client: Client=new Client();
  isOptional = false;
 isLinear = true;
 myControl = new FormControl();
 clients:Client[];
nom:any;
id : number ; 
p : number=1;
editProfileForm: FormGroup;
  constructor(private modalService: NgbModal,private _formBuilder: FormBuilder,private clientService : ClientService,private router:Router) { }
*/
  ngOnInit() {
    
   /* this.editProfileForm = this._formBuilder.group({
      id: [''],
      nom: [''],
      cine: [''],
      nom_societe: [''],
      rc: [''],
      tel: [''],

     });*/
  }




 /************************************** */
 /*update_client(){

  this.clientService.update_client(this.client).then(
    data=>{
      console.log(data);
      this.router.navigate([`/updateclient`]);
    },
    error=>{
      console.log(error);
    }
  )
}


openModal(targetModal, brancher) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static'
  });
 
  this.editProfileForm.patchValue({
   ct: brancher.compte,
   tel: brancher.sim.tel,
   operateur: brancher.sim.type_operateur,
   matricule: brancher.engine.matricule,
   marque: brancher.engine.marque,
   model: brancher.engine.model,
   typeengine: brancher.engine.type_engine,
   date:brancher.date_installation,
   imei: brancher.boitier.imei,
   typeboitier: brancher.boitier.type_boitier,

  });
 } onSubmit() {
  this.modalService.dismissAll();
  console.log("res:", this.editProfileForm.getRawValue());
 }
 selected(ev: Event, data: any) {
  console.log(data);
}
*/




   }

