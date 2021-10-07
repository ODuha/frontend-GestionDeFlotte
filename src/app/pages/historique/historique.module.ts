import { NgModule } from '@angular/core';
import {HistoriqueComponent} from "./historique.component";
import { FormsModule as ngFormsModule } from '@angular/forms';
import {ThemeModule} from "../../@theme/theme.module";
import {HistoriqueRoutingModule} from "./historique-routing.module";
import {LogComponent} from "./log/log.component";
import {NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule} from "@nebular/theme";
import {NbMomentDateModule} from "@nebular/moment";
import {NbDateFnsDateModule} from "@nebular/date-fns";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {Suivi_installationComponent} from "./suivi_installation/suivi_installation.component";
import { NbAuthJWTToken, NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy } from '@nebular/auth';
import { AuthentificationModule } from '../../authentification.module';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbDatepickerModule, NbIconModule,
    NbMomentDateModule,
    NbDateFnsDateModule,
    HistoriqueRoutingModule,
    ngFormsModule,
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
    }),
  ],
  declarations: [
    HistoriqueComponent,LogComponent,Suivi_installationComponent
  ],
})
export class HistoriqueModule {
}
