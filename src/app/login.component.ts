import {Component, Injectable, OnInit} from '@angular/core';
import {NbAuthService, NbLoginComponent, NbTokenService} from '@nebular/auth';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {tap} from "rxjs/internal/operators";
import {LoginService} from "./login.service";
import {device} from "./pages/dashboard/devices/interfaces/device.interface";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
@Injectable()
export class LoginComponent extends NbLoginComponent implements OnInit , CanActivate {


  constructor(public authService: LoginService , public router: Router ) {
    super(null,null,null,router);
  }
  user={name:"",password:""};
  showMessages={error:false};
  public form : any;
  ngOnInit()
  {
    this.user.name="";
    this.user.password="";
    this.form = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(this.user.password,Validators.required),
    });


    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }
  login()
  {
    console.log(this.user.name+" "+this.user.password);
    if(this.user.name !=null  && this.user.password != null )
    {

      this.showMessages.error = false;
      this.authService.login(
        {
          username: this.user.name,
          password: this.user.password
        }
      )
        .subscribe(success => {
          if (success) {
            this.router.navigate(['/pages']);
          }
        });
    }
    else
    {
      this.showMessages.error = true;
    }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
   {
     var data = next.data;
     console.log(data);

     var autorisation = JSON.parse(localStorage.getItem("DETAILS_USER")) == null ? null : JSON.parse(localStorage.getItem("DETAILS_USER")).type_user.type ;
     console.log(autorisation);
     if(autorisation)
     {
     if(data.roles && data.roles.length >0)
     {
       console.log("je suis la 1")
       let index = -1;
       for(var i=0;i<next.data.roles.length;i++)
       {
         if(next.data.roles[i] == autorisation)
         {
           index=1;
         }
       }
       if(index == -1)
       {
         console.log("je suis la");
         this.router.navigate(['pages/miscellaneous/404']);
       }
     }
     else if(state.url != "/pages/miscellaneous/404")
     {
       console.log(state.url);
       this.router.navigate(['pages/miscellaneous/404']);
     }
     }
     else
     {

       this.router.navigate(['auth/login']);
     }
     /*
     if(!this.authService.isLoggedIn())
    {
      console.log("je suis la !");
      this.router.navigate(['auth/login']);
    }
    else if(data.roles && data.roles.length >0)
    {
      console.log("je suis la 1")
      let index = -1;
      for(var i=0;i<next.data.roles.length;i++)
      {
        if(next.data.roles[i] == autorisation)
        {
          index=1;
        }
      }
      if(index == -1)
      {
        this.router.navigate(['pages/miscellaneous/404']);

      }
    }
    else if (state.url == "pages/miscellaneous/404")
    {
      console.log(data);
    }
    else if(state.url != "pages/miscellaneous/404")
    {
      console.log(data);
    }*/
     return this.authService.isLoggedIn();
  }
}

