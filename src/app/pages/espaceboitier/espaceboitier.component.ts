import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Client, Compte} from "../espaceclient/service/Client";
import { map, startWith } from 'rxjs/operators';
import {ClientService} from "../espaceclient/service/client.service";
import {Observable} from "rxjs/Rx";
import {RequireMatch} from "./RequireMatch";
import { Boitier, Brancher, Engine, Sim, Type_boitier, Type_engine, Type_operateur } from './service/Boitier';
import { BoitierService } from './service/boitier.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-espaceboitier',
  templateUrl: './espaceboitier.component.html',
  styleUrls: ['./espaceboitier.component.scss']
})
export class EspaceboitierComponent implements OnInit {
 firstFormGroup: FormGroup;
 secondFormGroup: FormGroup;
 thirdFormGroup: FormGroup;
 forthFormGroup: FormGroup;

 boitier: Boitier=new Boitier();
 client: Client=new Client();
 type_Boitier: Type_boitier=new Type_boitier();
 engine: Engine=new Engine();
 compte: Compte=new Compte(this.client);
 sim: Sim=new Sim();
 brancher: Brancher=new Brancher();
  isOptional = false;
 comptes: Compte[];
 type_operateur: Type_operateur=new Type_operateur() ;
type_engines:Type_engine[];
isLinear = true;
type_operateurs: Type_operateur[] ;
tboitiers : Type_boitier[];
disabled:false;
myControl = new FormControl();
options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  editProfileForm: FormGroup;
  //compte:any="";
  filteredOption: Observable<Compte[]>;
  constructor(private modalService: NgbModal,private boitierService : BoitierService,private clientService : ClientService,private _formBuilder: FormBuilder) { }
  number_only(event)
  {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  /*dropdownRefresh(){
    this.boitierService.getTypeboitier().subscribe(data=> data.forEach(element=> {this.type_boitier.push(element["observation"]);
  }))
  }*/
  
  ngOnInit() {
    this.editProfileForm = this._formBuilder.group({
      ct: [''],
      tel: [''],
      operateur: [''],
      matricule: [''],
      marque: [''],
      model: [''],
      typeengine: [''],
      date: [''],
      imei: [''],
      typeboitier: [''],
     
     });
    /*this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );*/
    
    this.getAllTypeboitier();
    this.getAllTypeoperateur();
    this.getAllTypeEngine();
    this.clientService.getCompte().subscribe(value=> this.comptes=value);
    this.firstFormGroup = this._formBuilder.group({
      ct: ['', Validators.compose([Validators.required,RequireMatch])]
    });
    this.filteredOption = this.firstFormGroup.controls['ct'].valueChanges.pipe(startWith(''),
      map(value => this.filterr(value)));
    this.secondFormGroup = this._formBuilder.group({
      tel :
      ['', Validators.compose([Validators.required, Validators.pattern("^0[5-7].{8}$")])],
      operateur :
      ['', Validators.compose([Validators.required])]
    });

      this.forthFormGroup = this._formBuilder.group({
          matricule: ['', Validators.compose([Validators.required])],
          marque : ['', Validators.compose([Validators.required])],
          model: ['', Validators.compose([Validators.required])],
          typeengine: ['', Validators.compose([Validators.required])],
          date : ['', Validators.compose([Validators.required])]

    });
    this.thirdFormGroup = this._formBuilder.group({
      imei : ['', Validators.compose([Validators.required, Validators.pattern(("^[0-9]{15}$"))])],
      typeboitier: ['', Validators.compose([Validators.required,RequireMatch])]
    });



  }
  //pop up
  public popoverTitle: string='Confirmation de lajout';
public confirmClicked: boolean=true;
public cancelClicked: boolean=false;


    getAllTypeEngine(){
      this.boitierService.getTypeengine().subscribe(value=>
        {
        this.type_engines=value;
        this.brancher.id_engine.type_engine=this.type_engines[0];
      }, err =>{
        console.log(err);
      }
        )
    }
  
   
  getAllTypeboitier(){
    this.boitierService.getTypeboitier().subscribe(value=>
      {
      this.tboitiers=value;
      this.brancher.id_boitier.type_boitier=this.tboitiers[0];

    }, err =>{
      console.log(err);
    }
      )
  }
  success_add = false;
  add_to_database()
  {
    this.boitierService.installation(this.brancher).then(data=>
    {
      console.log(data);
      this.success_add = true;
    })
    
  }
  getAllTypeoperateur(){
    this.boitierService.getTypeoperateur().subscribe(value=>
      {
      this.type_operateurs=value;
      this.brancher.id_sim.type_operateur=this.type_operateurs[0];

    }, err =>{
      console.log(err);
    }
      )
  }
  private _filter(value: any): Compte[] {
    const filterValue = value.toLowerCase();

    return this.comptes.filter(option => option.login.toLowerCase().includes(filterValue));
  }

  filterr(val: any): Compte[] {
    if (val) {
      let filterValue = val;
      if(typeof val === "string")
      {
      filterValue = val.toLowerCase();
      }
      // the below line is the change
      return this.comptes.filter(option => option.login.toLowerCase().includes(filterValue));
    }
    return this.comptes;
  }

  displayWith(obj?: Compte): string | undefined {
    return obj ? obj.login : undefined;
  }


  /*showValue()
  {
    console.log(this.compte);
  }*/

  openModal(targetModal, brancher) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.editProfileForm.patchValue({
     ct: brancher.id_compte.login,
     tel: brancher.id_sim.tel,
     operateur: brancher.id_sim.type_operateur.nomoperateur,
     matricule: brancher.id_engine.matricule,
     marque: brancher.id_engine.marque,
     model: brancher.id_engine.model,
     typeengine: brancher.id_engine.type_engine.type,
     date:brancher.date_installation,
     imei: brancher.id_boitier.imei,
     typeboitier: brancher.id_boitier.type_boitier.observation,
 
    });
    this.editProfileForm.disable();
   } onSubmit() {
    this.modalService.dismissAll();
    console.log("res:", this.editProfileForm.getRawValue());
   }
   selected(ev: Event, data: any) {
    console.log(data);
  }
}
