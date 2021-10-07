import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {Ng2SmartTableComponent} from "ng2-smart-table/ng2-smart-table.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {LoginComponent} from "../login.component";
import {TokenInterceptor} from "../token.interceptor";
import {LoginService} from "../login.service";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {NbAuthJWTToken, NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy} from "@nebular/auth";
import {AuthentificationModule} from "../authentification.module";
import { MatAutocompleteModule, MatButtonModule, MatDatepickerModule, MatIconModule, MatLabel, MatNativeDateModule, MatSelectModule, MatStepperModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule} from "@angular/material";
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgSwitch } from '@angular/common';
import { AlertComponent } from './extra-components/alert/alert.component';
import { EspaceclientComponent } from './espaceclient/espaceclient.component';
import { ClientService } from './espaceclient/service/client.service';
import { EspaceboitierComponent } from './espaceboitier/espaceboitier.component';
import { BoitierService } from './espaceboitier/service/boitier.service';
import { ListesComponent } from './listes/listes.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateclientComponent } from './updateclient/updateclient.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ConfirmationPopoverModule} from 'angular-confirmation-popover';
import { PagesRoutingModule } from './pages-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
  RouterModule,
  
  NgbModule,
  MatFormFieldModule,
        MatInputModule,
        
  MatButtonModule,
    CdkStepperModule,
    ConfirmationPopoverModule.forRoot({confirmButtonType:'danger'}),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatStepperModule,
    MatIconModule,
    HttpClientModule,
    MatInputModule,
    NbCardModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule  ,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    AuthentificationModule,
    NbAuthModule.forRoot({
      strategies: [
        NbDummyAuthStrategy.setup({
          name: 'login', 
          alwaysFail: false,

        }),
        NbPasswordAuthStrategy.setup({
          name: 'login',

          token: {
            class: NbAuthJWTToken,

            key: 'token', // this parameter tells where to look for the token
          }
        }),
      ],
    })
  ],
  declarations: [
    PagesComponent,
 
    EspaceclientComponent,
 
    EspaceboitierComponent,
 
    ListesComponent,
 
    UpdateclientComponent,
 
 
 
    
  ],
  providers:[LoginComponent,LoginService,ClientService,BoitierService,AlertComponent
    ,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
})
export class PagesModule {
}
