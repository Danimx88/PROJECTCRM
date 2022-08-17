import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Auth/login/login.component';
import { FormCitaComponent } from './Components/Cita/form-cita/form-cita.component';
import { ListCitaComponent } from './Components/Cita/list-cita/list-cita.component';
import ClienteFormComponent from './Components/Cliente/form/form.component';
import { ClienteListComponent } from "./Components/Cliente/list/list.component";
import { BodyComponent } from './Components/Public/body/body.component';
import { FormUserComponent } from './Components/Usuario/form/form.component';
import { ListUserComponent } from './Components/Usuario/list/list.component';
import { AuthGuard } from './guards/auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'cliente',
    children: [
      {
        path: '',
        component: ClienteListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'formCliente',
        component: ClienteFormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'editar/:id',
        component: ClienteFormComponent,
        canActivate: [AuthGuard],
      },
    ]
  },

  {
    path: 'usuario',
    children: [
      {
        path: '',
        component: ListUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'formUsuario',
        component: FormUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'editar/:id',
        component: FormUserComponent,
        canActivate: [AuthGuard],
      },
    ]
  },

  {
    path: 'cita',
    children: [
      {
        path: '',
        component: ListCitaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'formCita/:idCliente',
        component: FormCitaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'formCita',
        component: FormCitaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'editar/:id',
        component: FormCitaComponent,
        canActivate: [AuthGuard],
      },
    ]
  },

  //Wild Card Route for 404 request
  {
    path: '**', pathMatch: 'full',
    component: PagenotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
