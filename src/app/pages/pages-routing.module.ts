import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { LoginComponent } from "../login.component";
import { HistoriqueModule } from "./historique/historique.module";
import { from } from 'rxjs';

import { EspaceclientComponent } from './espaceclient/espaceclient.component';
import { EspaceboitierComponent } from './espaceboitier/espaceboitier.component';
import { ListesComponent } from './listes/listes.component';
import { UpdateclientComponent } from './updateclient/updateclient.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [LoginComponent],
      data:{roles:['admin','technicien','comptable']}
    },
    {
      path: 'iot-dashboard',
      component:  ECommerceComponent,
      canActivate: [LoginComponent],
      data:{roles:['admin']}
    },
    {
    
      path: 'espaceboitier',
      component:EspaceboitierComponent,
      canActivate: [LoginComponent],
      data:{roles:['admin']}
    },


    {
    
      path: 'espaceclient',
      component:EspaceclientComponent,
      canActivate: [LoginComponent],
      data:{roles:['admin']}
    },

    {
    
      path: 'listes/edit',
      component:UpdateclientComponent,
      canActivate: [LoginComponent],
      data:{roles:['admin']}

    },
    {
    
      path: 'listes',
      component:ListesComponent,
      canActivate: [LoginComponent],
      data:{roles:['admin']}
    },


    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'historique',
      loadChildren: () => import('./historique/historique.module')
        .then(m => m.HistoriqueModule),
      canActivate: [LoginComponent],
      data:{roles:['admin']}
    },

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
