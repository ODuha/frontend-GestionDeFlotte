import {Component, OnInit} from '@angular/core';
import {Client, Compte} from '../espaceclient/service/Client';
import {ClientService} from '../espaceclient/service/client.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {
  Boitier,
  Brancher,
  Engine,
  Sim,
  Type_boitier,
  Type_engine,
  Type_operateur,
} from '../espaceboitier/service/Boitier';
import {BoitierService} from '../espaceboitier/service/boitier.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'ngx-listes',
  templateUrl: './listes.component.html',
  styleUrls: ['./listes.component.scss'],
})
export class ListesComponent implements OnInit {

  public popoverTitle: string = 'Confirmation de la suppression';
  public popoverMessage: string = 'Voulez-vous vraiment supprimer cet client?';
  public confirmClicked: boolean = true;
  public cancelClicked: boolean = false;


  boitier: Boitier = new Boitier();
  client: Client = new Client();
  compte: Compte = new Compte();
  comptes: Compte[];
  isLinear = true;

  type_Boitier: Type_boitier = new Type_boitier();
  engine: Engine = new Engine();
  sim: Sim = new Sim();
  brancher: Brancher = new Brancher();
  isOptional = false;

  type_operateur: Type_operateur = new Type_operateur();
  type_engines: Type_engine[];

  type_operateurs: Type_operateur[];
  tboitiers: Type_boitier[];
  branchers: Brancher[];
  myControl = new FormControl();
  clients: Client[];
  nom: any;
  id: number;
  p: number = 1;
  editProfileForm: FormGroup;

  constructor(private modalService: NgbModal,
              private _formBuilder: FormBuilder,
              private clientService: ClientService,
              private boitierservice: BoitierService) {
  }

  ngOnInit() {
    this.getAllClients();
    this.editProfileForm = this._formBuilder.group({
      id: [''],
      nom: [''],
      cine: [''],
      nom_societe: [''],
      rc: [''],
      tel: [''],
      email: [''],

    });
    this.boitierservice.getBrancher()
      .subscribe(data => {
        this.branchers = data;
      });
  }

  toString(obj) {
    console.log(obj);
    return JSON.stringify(obj);
  }


  getAllClients() {
    this.clientService
      .getClient()
      .pipe(
        map(val => val.filter(client => client.actif !== 0)),
      )
      .subscribe(value => {
          this.clients = value;
        }, err => {
          console.log(err);
        },
      );
  }

  Search() {
    if (this.nom == '') {
      this.ngOnInit();
    } else {
      this.clients = this.clients.filter(res => {
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      });
    }
  }


  update_client(client: Client) {
    // localStorage.setItem("id",client.id.toString());
    this.clientService.update_client(client).then(
      data => {
        console.log(data);


      },
      error => {
        console.log(error);
      },
    );
  }


  desactiver(client: Client) {
    // localStorage.setItem("id",client.id.toString());
    console.log(JSON.stringify(client));
    this
      .clientService
      .desactiver(client)
      .subscribe(
        value => {
          this.getAllClients();
          console.log(value);
        },
        error => {
          console.log(error);
        },
      );
  }


  delete_client(id) {
    const index = this.clients.findIndex(e => e.id === id);
    if (index !== -1) {
      this.clients.splice(index, 1);
    }
    console.log(id);
  }


  /***************** */


  openModal(targetModal, client) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });

    this.editProfileForm.patchValue({
      id: client.id,
      nom: client.nom,
      cine: client.cine,
      nom_societe: client.nom_societe,
      rc: client.rc,
      tel: client.tel,
    });
  }

  onSubmit() {
    this.modalService.dismissAll();
    console.log('res:', this.editProfileForm.getRawValue());
  }

  selected(ev: Event, data: any) {
    console.log(data);
  }

  test() {
    if (this.client.type === 1) {
      // ???
      nom: this.client.nom;
    } else if (this.client.type === 2) {
      // ???
      rc : this.client.rc;
    }
  }

}
