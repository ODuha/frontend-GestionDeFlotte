import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ClientService} from "./service/client.service";
import {Client, Compte} from "./service/Client";

// import custom validator to validate that password and confirm password fields match
import {AlertComponent} from "../extra-components/alert/alert.component";


@Component({
  selector: 'ngx-espaceclient',
  templateUrl: './espaceclient.component.html',
  styleUrls: ['./espaceclient.component.scss']
})
export class EspaceclientComponent implements OnInit {
  Client:Client=new Client();
  comptes:Compte=new Compte();
 
  fieldTextType: boolean;
  constructor(private alert_controller:AlertComponent,private clientService : ClientService) { }
  hide=true;

  LoginExistInToDB(index)
  {
    return this.clientService.compte_exist(this.Client.comptes[index]).then((data)=>
    {
      if(data.response == true)
      {
        return true;
      }
      else
      {
       alert("vous pouvez continuer votre ajout ");
      }
    });
  }
  public popoverTitle: string="Confirmation de l'ajout";
public popoverMessage: string='Voulez-vous vraiment ajouter ce client?';
public confirmClicked: boolean=true;
public cancelClicked: boolean=false;
  add_client()
  {
    var exist = false;
    for(var i =0;i<this.Client.comptes.length;i++)
    {
      this.LoginExistInToDB(i).then((data)=>
      {
        exist = data;
        alert(data);

      });
      if(exist)
      {
        alert("compte deja existe sur la base de donnée !");
        break;
      }

    }
  if(!exist)
    {
      this.clientService.add_client(this.Client).then((data:any)=>{console.log(data);
        
      })
    }
    this.exform.reset();
    
    

  }

  number_only(event)
  {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
  add_compte()
  {
    this.Client.comptes.push(new Compte(this.Client));
    var form_ctrl = new FormGroup({
      'login' : new FormControl(null, Validators.required),
      'tel' : new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern("^0[5-7].{8}$")
        ]),
      'email' :  new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),

      'password' : new FormControl(null, Validators.required)
    });
    this.exComptesform.push(form_ctrl);
    

  }
  show_tab=1;
  new_one(e) {
    this.Client = new Client();
    this.Client.type = e.index + 1;
    if (e.index == 0) {
      this.show_tab = e.index + 1;
      this.exform = new FormGroup({
        'nom': new FormControl(null, Validators.required),
        'prenom': new FormControl(null, Validators.required),
        'cine': new FormControl(null, Validators.required),
        'adresse': new FormControl(null, Validators.required),
        'tel': new FormControl(
          '',
          [
            Validators.required,
            Validators.pattern("^0[5-7].{8}$")
          ]),
        'email': new FormControl('', [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      });
    }
    else {

      this.show_tab = e.index + 1;
      this.exform = new FormGroup({
        'nom_societe': new FormControl(null, Validators.required),
        'rc': new FormControl(null, Validators.required),
        'adresse': new FormControl(null, Validators.required),
        'tel': new FormControl(
          '',
          [
            Validators.required,
            Validators.pattern("^0[5-7].{8}$")
          ]),
        'email': new FormControl('', [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      });
    }
  }
  remove_compte(index){
    this.Client.comptes.splice(index);

  }


  LoginExist(index)
  {
    let exist = false;
    this.Client.comptes.forEach((val:Compte,i)=>
    {
      if(i != index)
      {
       if(val.login == this.Client.comptes[index].login)
        {
          
          
          return true;
        }
      }
    });
    return exist;
  }
  IsValidForm()
  {
    var client_valid = !this.exform.valid;
    var valid_comptes = false;
    this.exComptesform.forEach((val:FormGroup,index)=>
    {
      if(!val.valid)
      {
        valid_comptes=!val.valid;
      }
      valid_comptes = this.LoginExist(index);
      if(valid_comptes)
      {
        return
      }
    });
    return client_valid || valid_comptes;
  }
  viewMode = 'tab1';
        exform: FormGroup;
        submitted = false;
      exComptesform =[];
        ngOnInit() {

        this.exform = new FormGroup({
          'nom' : new FormControl(null, Validators.required),
          'prenom' : new FormControl(null, Validators.required),
          'cine' : new FormControl(null, Validators.required),
          'adresse' : new FormControl(null, Validators.required),
          'tel' : new FormControl(
            '',
            [
              Validators.required,
              Validators.pattern("^0[5-7].{8}$")
            ]),
          'email' :  new FormControl('',[
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
        });
        }

        clicksub() {
          console.log(this.exform.value);
          this.exform.reset();
        }
        get adresse(){
          return this.exform.get('adresse');
        }
        get nom() {
          return this.exform.get('nom');
        }
        get  nom_societe() {
          return this.exform.get('nom_societe');
        }
        get rc() {
          return this.exform.get('rc');
        }
        get prenom() {
          return this.exform.get('prenom');
        }
        get cine() {
          return this.exform.get('cine');
        }
        get email() {
          return this.exform.get('email');
        }
        get tel() {
          return this.exform.get('tel');
        }
        get password() {
          return this.exform.get('password');
        }



    get f() { return this.exform.controls; }

    onSubmit(event) {
      event.preventDefault();
        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.exform.value, null, 4));
    }

    onReset() {
        this.exform.reset();
        this.exComptesform=[];
        this.Client = new Client();
        this.submitted = false;
    }


  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  
}
