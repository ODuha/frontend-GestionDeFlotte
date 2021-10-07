import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HistoriqueComponent} from "./historique.component";
import {LogComponent} from "./log/log.component";
import {Suivi_installationComponent} from "./suivi_installation/suivi_installation.component";
import { LoginComponent } from '../../login.component';


const routes: Routes = [{
  path: '',
  component: HistoriqueComponent,
  children: [
    {
      path: 'log',
      component: LogComponent,
      canActivate: [LoginComponent],
      data:{roles:['admin']}
    },
    {
      path: 'suivi_installation',
      component: Suivi_installationComponent,
    },
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriqueRoutingModule {
}
